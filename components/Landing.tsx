import axios from "axios";
import React, { useEffect, useState } from "react";
import { languageOptions } from "../constants/languageOptions";
import CodeEditorWindow from "./CodeEditorWindow";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useKeyPress from "../hooks/useKeyPress";
import { defineTheme } from "../lib/defineTheme";
import LanguagesDropdown from "./LanguagesDropdown";
import OutputDetails from "./OutputDetails";
import OutputWindow from "./OutputWindow";
import ThemeDropdown from "./ThemeDropdown";
import { LandingProps } from "@/types/lessons";

const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));
`;

const Landing = ({ codeLessonDefault }: LandingProps) => {
  const [code, setCode] = useState(codeLessonDefault);
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [theme, setTheme] = useState({
    value: "oceanic-next",
    label: "Oceanic Next",
  });
  const [language, setLanguage] = useState(languageOptions[0]);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  const themeMUI = useTheme();
  const isMobile = useMediaQuery(themeMUI.breakpoints.up("md"));

  const onSelectChange = (
    sl: React.SetStateAction<{
      id: number;
      name: string;
      label: string;
      value: string;
    }>
  ) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action: any, data: React.SetStateAction<string>) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(""),
    };
    const options = {
      method: "POST",
      url: process.env.NEXT_PUBLIC_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response: { data: { token: any } }) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err: { response: { data: any; status: any } }) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response ? err.response.status : 500;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token: any) => {
    const options = {
      method: "GET",
      url: process.env.NEXT_PUBLIC_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast(err);
    }
  };

  function handleThemeChange(th: any) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
    setErrorOpen(false);
  };

  const showSuccessToast = (msg: string): void => {
    setSuccessOpen(true);
    setMsg(msg);
  };
  const showErrorToast = (msg: any) => {
    setErrorOpen(true);
    setMsg(msg);
  };

  return (
    <>
      {isMobile ? (
        <>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Box sx={{ width: "85%" }}>
              <CodeEditorWindow
                code={code}
                onChange={onChange}
                language={language?.value}
                theme={theme.value}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1rem",
                width: "15%",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Button
                  sx={{ width: "fit-content", margin: "1rem auto" }}
                  variant="contained"
                  onClick={handleCompile}
                  disabled={!code}
                >
                  {processing ? "Processing..." : "Compile and Execute"}
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "fit-content",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "1rem",
                }}
              >
                <Box sx={{ marginBottom: "1rem" }}>
                  <LanguagesDropdown onSelectChange={onSelectChange} />
                </Box>
                <Box>
                  <ThemeDropdown
                    handleThemeChange={handleThemeChange}
                    theme={theme}
                  />
                </Box>
              </Box>
              {outputDetails && <OutputDetails outputDetails={outputDetails} />}
            </Box>
          </Box>
          <OutputWindow outputDetails={outputDetails} />
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            autoHideDuration={2500}
            message={msg || `Compiled Successfully!`}
            key={"bottom" + "left"}
            open={successOpen}
            onClose={handleClose}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              {msg}
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            autoHideDuration={2500}
            message={msg || `Compiled Successfully!`}
            key={"bottom" + "left"}
            open={errorOpen}
            onClose={handleClose}
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              {msg}
            </Alert>
          </Snackbar>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
            <Box sx={{ width: "100%" }}>
              <CodeEditorWindow
                code={code}
                onChange={onChange}
                language={language?.value}
                theme={theme.value}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1rem",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Button
                  sx={{ width: "fit-content", margin: "1rem auto" }}
                  variant="contained"
                  onClick={handleCompile}
                  disabled={!code}
                >
                  {processing ? "Processing..." : "Compile and Execute"}
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "fit-content",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "1rem",
                }}
              >
                <Box sx={{ marginBottom: "1rem" }}>
                  <LanguagesDropdown onSelectChange={onSelectChange} />
                </Box>
                <Box>
                  <ThemeDropdown
                    handleThemeChange={handleThemeChange}
                    theme={theme}
                  />
                </Box>
              </Box>
              {outputDetails && <OutputDetails outputDetails={outputDetails} />}
            </Box>
          </Box>
          <OutputWindow outputDetails={outputDetails} />
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            autoHideDuration={2500}
            message={msg || `Compiled Successfully!`}
            key={"bottom" + "left"}
            open={successOpen}
            onClose={handleClose}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              {msg}
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            autoHideDuration={2500}
            message={msg || `Compiled Successfully!`}
            key={"bottom" + "left"}
            open={errorOpen}
            onClose={handleClose}
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              {msg}
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
};
export default Landing;
