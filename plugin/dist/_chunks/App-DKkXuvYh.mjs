import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Page } from "@strapi/strapi/admin";
import { Routes, Route } from "react-router-dom";
import { Main, Typography, Box, SingleSelect, SingleSelectOption, Button } from "@strapi/design-system";
import { useState, useEffect } from "react";
async function getSpecialities() {
  const resp = await fetch("http://localhost:1337/api/specialities?populate=*");
  return resp.json();
}
const HomePage = () => {
  const [specialities, setSpecialities] = useState([]);
  const [selectValue, setSelectValue] = useState(null);
  function getSpecialitiesFromFetch() {
    const correctedSpecialities = [];
    getSpecialities().then((res) => {
      for (let speciality of res.data) {
        for (let task of speciality.tasks) {
          if (speciality.activity && task.activity) {
            correctedSpecialities.push(speciality);
          }
        }
      }
      setSpecialities(correctedSpecialities);
    });
  }
  useEffect(() => {
    getSpecialitiesFromFetch();
  }, []);
  return /* @__PURE__ */ jsxs(
    Main,
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 25,
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 56,
        paddingRight: 56
      },
      children: [
        /* @__PURE__ */ jsx(Typography, { variant: "beta", style: { fontSize: 32, fontWeight: 400, color: "#32324D" }, children: "Выбор задания" }),
        !specialities.length ? /* @__PURE__ */ jsx(Typography, { style: { fontWeight: 400, fontSize: 14, color: "#32324D" }, children: "Для выбора задания необходимо добавить хотя бы одну активную специальность и хотя бы одно активное задания для нее." }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(Box, { style: { display: "flex", flexDirection: "column", gap: 20 }, children: [
            /* @__PURE__ */ jsx(Typography, { children: "Специальность" }),
            /* @__PURE__ */ jsx(
              SingleSelect,
              {
                placeholder: "Выберите специальность",
                style: { width: 640, height: 43 },
                value: selectValue,
                onChange: (val) => setSelectValue(val),
                children: specialities.map((speciality) => {
                  return /* @__PURE__ */ jsx(SingleSelectOption, { value: speciality.documentId, children: speciality.name }, speciality.id);
                })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Button, { style: { width: 270, height: 33 }, disabled: !selectValue, children: "Сгенерировать ссылку на задание" })
        ] })
      ]
    }
  );
};
const App = () => {
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(HomePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Page.Error, {}) })
  ] });
};
export {
  App
};
//# sourceMappingURL=App-DKkXuvYh.mjs.map
