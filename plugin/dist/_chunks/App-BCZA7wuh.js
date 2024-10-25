"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const reactRouterDom = require("react-router-dom");
const designSystem = require("@strapi/design-system");
const react = require("react");
async function getSpecialities() {
  const resp = await fetch("http://localhost:1337/api/specialities?populate=*");
  return resp.json();
}
const HomePage = () => {
  const [specialities, setSpecialities] = react.useState([]);
  const [selectValue, setSelectValue] = react.useState(null);
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
  react.useEffect(() => {
    getSpecialitiesFromFetch();
  }, []);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Main,
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
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", style: { fontSize: 32, fontWeight: 400, color: "#32324D" }, children: "Выбор задания" }),
        !specialities.length ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { style: { fontWeight: 400, fontSize: 14, color: "#32324D" }, children: "Для выбора задания необходимо добавить хотя бы одну активную специальность и хотя бы одно активное задания для нее." }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { style: { display: "flex", flexDirection: "column", gap: 20 }, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: "Специальность" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.SingleSelect,
              {
                placeholder: "Выберите специальность",
                style: { width: 640, height: 43 },
                value: selectValue,
                onChange: (val) => setSelectValue(val),
                children: specialities.map((speciality) => {
                  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: speciality.documentId, children: speciality.name }, speciality.id);
                })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { style: { width: 270, height: 33 }, disabled: !selectValue, children: "Сгенерировать ссылку на задание" })
        ] })
      ]
    }
  );
};
const App = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Routes, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { index: true, element: /* @__PURE__ */ jsxRuntime.jsx(HomePage, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "*", element: /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {}) })
  ] });
};
exports.App = App;
//# sourceMappingURL=App-BCZA7wuh.js.map
