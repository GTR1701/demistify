export default async function redirects() {
  return [
    {
      source: "/file_should_be_disabled", // this path will be redirected to 404
      destination: "/404",
      permanent: true,
    },
    {
      source: "/abc",
      destination: "/file_accessible_by_different_route", // when visiting /abc, you will be redirected to this path
    },
  ];
}
