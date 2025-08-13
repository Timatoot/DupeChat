/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/chat/route";
exports.ids = ["app/api/chat/route"];
exports.modules = {

/***/ "(rsc)/./app/api/chat/route.ts":
/*!*******************************!*\
  !*** ./app/api/chat/route.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var _google_genai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @google/genai */ \"(rsc)/./node_modules/@google/genai/dist/node/index.mjs\");\n\nconst runtime = \"nodejs\"; // Gemini SDK needs Node environment\nfunction j(status, message) {\n    return new Response(JSON.stringify({\n        error: message\n    }), {\n        status,\n        headers: {\n            \"content-type\": \"application/json\"\n        }\n    });\n}\nasync function POST(req) {\n    const apiKey = process.env.GEMINI_API_KEY;\n    if (!apiKey) return j(500, \"Server missing GEMINI_API_KEY\");\n    let body;\n    try {\n        body = await req.json();\n    } catch  {\n        return j(400, \"Invalid JSON body\");\n    }\n    const { system, messages } = body || {};\n    if (!system || !messages?.length) return j(400, \"Missing system or messages\");\n    try {\n        const ai = new _google_genai__WEBPACK_IMPORTED_MODULE_0__.GoogleGenAI({\n            apiKey\n        });\n        // Find the last user message to generate a response to\n        const lastUserIndexFromEnd = [\n            ...messages\n        ].reverse().findIndex((m)=>m.role === \"user\");\n        if (lastUserIndexFromEnd === -1) return j(400, \"No user message to respond to\");\n        const lastIndex = messages.length - 1 - lastUserIndexFromEnd;\n        const lastUser = messages[lastIndex];\n        // Prior messages become history; map roles to Gemini's expected roles\n        const history = messages.slice(0, lastIndex).map((m)=>({\n                role: m.role === \"assistant\" ? \"model\" : \"user\",\n                parts: [\n                    {\n                        text: m.content\n                    }\n                ]\n            }));\n        // Create chat with system instructions and stream reply\n        const chat = ai.chats.create({\n            model: \"gemini-2.5-flash\",\n            history,\n            config: {\n                thinkingConfig: {\n                    thinkingBudget: 0\n                },\n                systemInstruction: system,\n                temperature: 0.8,\n                topP: 0.8,\n                topK: 20\n            }\n        });\n        const streamIt = await chat.sendMessageStream({\n            message: lastUser.content\n        });\n        const encoder = new TextEncoder();\n        const stream = new ReadableStream({\n            async start (controller) {\n                try {\n                    for await (const chunk of streamIt){\n                        const text = String(chunk?.text ?? \"\");\n                        if (text) {\n                            const payload = {\n                                choices: [\n                                    {\n                                        delta: {\n                                            content: text\n                                        }\n                                    }\n                                ]\n                            };\n                            controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\\n\\n`));\n                        }\n                    }\n                    controller.enqueue(encoder.encode(`data: [DONE]\\n\\n`));\n                    controller.close();\n                } catch (e) {\n                    controller.error(e);\n                }\n            }\n        });\n        return new Response(stream, {\n            headers: {\n                \"content-type\": \"text/event-stream; charset=utf-8\",\n                \"cache-control\": \"no-cache, no-transform\",\n                \"x-accel-buffering\": \"no\",\n                connection: \"keep-alive\"\n            }\n        });\n    } catch (err) {\n        console.error(err);\n        return j(500, \"Error calling Gemini API\");\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WUFDMUJ6QyxTQUFTO2dCQUNQLGdCQUFnQjtnQkFDaEIsaUJBQWlCO2dCQUNqQixxQkFBcUI7Z0JBQ3JCc0QsWUFBWTtZQUNkO1FBQ0Y7SUFDRixFQUFFLE9BQU9DLEtBQVU7UUFDakJDLFFBQVF6RCxLQUFLLENBQUN3RDtRQUNkLE9BQU85RCxFQUFFLEtBQUs7SUFDaEI7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxUaW1SXFxDb2RlXFxkb3BwZWwtbGFuZGluZy11cGRhdGVkXFxsYW5kaW5nX3Byb2plY3RcXGFwcFxcYXBpXFxjaGF0XFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHsgR29vZ2xlR2VuQUkgfSBmcm9tIFwiQGdvb2dsZS9nZW5haVwiO1xuXG5leHBvcnQgY29uc3QgcnVudGltZSA9IFwibm9kZWpzXCI7IC8vIEdlbWluaSBTREsgbmVlZHMgTm9kZSBlbnZpcm9ubWVudFxuXG5mdW5jdGlvbiBqKHN0YXR1czogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBtZXNzYWdlIH0pLCB7XG4gICAgc3RhdHVzLFxuICAgIGhlYWRlcnM6IHsgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogTmV4dFJlcXVlc3QpIHtcbiAgY29uc3QgYXBpS2V5ID0gcHJvY2Vzcy5lbnYuR0VNSU5JX0FQSV9LRVk7XG4gIGlmICghYXBpS2V5KSByZXR1cm4gaig1MDAsIFwiU2VydmVyIG1pc3NpbmcgR0VNSU5JX0FQSV9LRVlcIik7XG5cbiAgbGV0IGJvZHk6IHtcbiAgICBzeXN0ZW06IHN0cmluZztcbiAgICBtZXNzYWdlczogeyByb2xlOiBcInVzZXJcIiB8IFwiYXNzaXN0YW50XCI7IGNvbnRlbnQ6IHN0cmluZyB9W107XG4gIH07XG4gIHRyeSB7XG4gICAgYm9keSA9IGF3YWl0IHJlcS5qc29uKCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBqKDQwMCwgXCJJbnZhbGlkIEpTT04gYm9keVwiKTtcbiAgfVxuXG4gIGNvbnN0IHsgc3lzdGVtLCBtZXNzYWdlcyB9ID0gYm9keSB8fCB7fTtcbiAgaWYgKCFzeXN0ZW0gfHwgIW1lc3NhZ2VzPy5sZW5ndGgpIHJldHVybiBqKDQwMCwgXCJNaXNzaW5nIHN5c3RlbSBvciBtZXNzYWdlc1wiKTtcblxuICB0cnkge1xuICAgIGNvbnN0IGFpID0gbmV3IEdvb2dsZUdlbkFJKHsgYXBpS2V5IH0pO1xuXG4gICAgLy8gRmluZCB0aGUgbGFzdCB1c2VyIG1lc3NhZ2UgdG8gZ2VuZXJhdGUgYSByZXNwb25zZSB0b1xuICAgIGNvbnN0IGxhc3RVc2VySW5kZXhGcm9tRW5kID0gWy4uLm1lc3NhZ2VzXS5yZXZlcnNlKCkuZmluZEluZGV4KChtKSA9PiBtLnJvbGUgPT09IFwidXNlclwiKTtcbiAgICBpZiAobGFzdFVzZXJJbmRleEZyb21FbmQgPT09IC0xKSByZXR1cm4gaig0MDAsIFwiTm8gdXNlciBtZXNzYWdlIHRvIHJlc3BvbmQgdG9cIik7XG4gICAgY29uc3QgbGFzdEluZGV4ID0gbWVzc2FnZXMubGVuZ3RoIC0gMSAtIGxhc3RVc2VySW5kZXhGcm9tRW5kO1xuICAgIGNvbnN0IGxhc3RVc2VyID0gbWVzc2FnZXNbbGFzdEluZGV4XTtcblxuICAgIC8vIFByaW9yIG1lc3NhZ2VzIGJlY29tZSBoaXN0b3J5OyBtYXAgcm9sZXMgdG8gR2VtaW5pJ3MgZXhwZWN0ZWQgcm9sZXNcbiAgICBjb25zdCBoaXN0b3J5ID0gbWVzc2FnZXNcbiAgICAgIC5zbGljZSgwLCBsYXN0SW5kZXgpXG4gICAgICAubWFwKChtKSA9PiAoeyByb2xlOiBtLnJvbGUgPT09IFwiYXNzaXN0YW50XCIgPyBcIm1vZGVsXCIgOiBcInVzZXJcIiwgcGFydHM6IFt7IHRleHQ6IG0uY29udGVudCB9XSB9KSk7XG5cbiAgICAvLyBDcmVhdGUgY2hhdCB3aXRoIHN5c3RlbSBpbnN0cnVjdGlvbnMgYW5kIHN0cmVhbSByZXBseVxuICAgIGNvbnN0IGNoYXQgPSAoYWkgYXMgYW55KS5jaGF0cy5jcmVhdGUoe1xuICAgICAgbW9kZWw6IFwiZ2VtaW5pLTIuNS1mbGFzaFwiLFxuICAgICAgaGlzdG9yeSxcbiAgICAgIGNvbmZpZzogeyBcbiAgICAgICAgdGhpbmtpbmdDb25maWc6IHtcbiAgICAgICAgICB0aGlua2luZ0J1ZGdldDogMFxuICAgICAgICB9LFxuICAgICAgICBzeXN0ZW1JbnN0cnVjdGlvbjogc3lzdGVtLFxuICAgICAgICB0ZW1wZXJhdHVyZTogMC44LFxuICAgICAgICB0b3BQOiAwLjgsXG4gICAgICAgIHRvcEs6IDIwXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3Qgc3RyZWFtSXQgPSBhd2FpdCBjaGF0LnNlbmRNZXNzYWdlU3RyZWFtKHsgbWVzc2FnZTogbGFzdFVzZXIuY29udGVudCB9KTtcblxuICAgIGNvbnN0IGVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKTtcbiAgICBjb25zdCBzdHJlYW0gPSBuZXcgUmVhZGFibGVTdHJlYW08VWludDhBcnJheT4oe1xuICAgICAgYXN5bmMgc3RhcnQoY29udHJvbGxlcikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2Ygc3RyZWFtSXQgYXMgYW55KSB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gU3RyaW5nKChjaHVuayBhcyBhbnkpPy50ZXh0ID8/IFwiXCIpO1xuICAgICAgICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHsgY2hvaWNlczogW3sgZGVsdGE6IHsgY29udGVudDogdGV4dCB9IH1dIH07XG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShlbmNvZGVyLmVuY29kZShgZGF0YTogJHtKU09OLnN0cmluZ2lmeShwYXlsb2FkKX1cXG5cXG5gKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShlbmNvZGVyLmVuY29kZShgZGF0YTogW0RPTkVdXFxuXFxuYCkpO1xuICAgICAgICAgIGNvbnRyb2xsZXIuY2xvc2UoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnRyb2xsZXIuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKHN0cmVhbSwge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcInRleHQvZXZlbnQtc3RyZWFtOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgIFwiY2FjaGUtY29udHJvbFwiOiBcIm5vLWNhY2hlLCBuby10cmFuc2Zvcm1cIixcbiAgICAgICAgXCJ4LWFjY2VsLWJ1ZmZlcmluZ1wiOiBcIm5vXCIsXG4gICAgICAgIGNvbm5lY3Rpb246IFwia2VlcC1hbGl2ZVwiLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgcmV0dXJuIGooNTAwLCBcIkVycm9yIGNhbGxpbmcgR2VtaW5pIEFQSVwiKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkdvb2dsZUdlbkFJIiwicnVudGltZSIsImoiLCJzdGF0dXMiLCJtZXNzYWdlIiwiUmVzcG9uc2UiLCJKU09OIiwic3RyaW5naWZ5IiwiZXJyb3IiLCJoZWFkZXJzIiwiUE9TVCIsInJlcSIsImFwaUtleSIsInByb2Nlc3MiLCJlbnYiLCJHRU1JTklfQVBJX0tFWSIsImJvZHkiLCJqc29uIiwic3lzdGVtIiwibWVzc2FnZXMiLCJsZW5ndGgiLCJhaSIsImxhc3RVc2VySW5kZXhGcm9tRW5kIiwicmV2ZXJzZSIsImZpbmRJbmRleCIsIm0iLCJyb2xlIiwibGFzdEluZGV4IiwibGFzdFVzZXIiLCJoaXN0b3J5Iiwic2xpY2UiLCJtYXAiLCJwYXJ0cyIsInRleHQiLCJjb250ZW50IiwiY2hhdCIsImNoYXRzIiwiY3JlYXRlIiwibW9kZWwiLCJjb25maWciLCJ0aGlua2luZ0NvbmZpZyIsInRoaW5raW5nQnVkZ2V0Iiwic3lzdGVtSW5zdHJ1Y3Rpb24iLCJ0ZW1wZXJhdHVyZSIsInRvcFAiLCJ0b3BLIiwic3RyZWFtSXQiLCJzZW5kTWVzc2FnZVN0cmVhbSIsImVuY29kZXIiLCJUZXh0RW5jb2RlciIsInN0cmVhbSIsIlJlYWRhYmxlU3RyZWFtIiwic3RhcnQiLCJjb250cm9sbGVyIiwiY2h1bmsiLCJTdHJpbmciLCJwYXlsb2FkIiwiY2hvaWNlcyIsImRlbHRhIiwiZW5xdWV1ZSIsImVuY29kZSIsImNsb3NlIiwiZSIsImNvbm5lY3Rpb24iLCJlcnIiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/chat/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5CTimR%5CCode%5Cdoppel-landing-updated%5Clanding_project%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CTimR%5CCode%5Cdoppel-landing-updated%5Clanding_project&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5CTimR%5CCode%5Cdoppel-landing-updated%5Clanding_project%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CTimR%5CCode%5Cdoppel-landing-updated%5Clanding_project&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_TimR_Code_doppel_landing_updated_landing_project_app_api_chat_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/chat/route.ts */ \"(rsc)/./app/api/chat/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/chat/route\",\n        pathname: \"/api/chat\",\n        filename: \"route\",\n        bundlePath: \"app/api/chat/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\TimR\\\\Code\\\\doppel-landing-updated\\\\landing_project\\\\app\\\\api\\\\chat\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_TimR_Code_doppel_landing_updated_landing_project_app_api_chat_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjaGF0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZjaGF0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGY2hhdCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNUaW1SJTVDQ29kZSU1Q2RvcHBlbC1sYW5kaW5nLXVwZGF0ZWQlNUNsYW5kaW5nX3Byb2plY3QlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q1RpbVIlNUNDb2RlJTVDZG9wcGVsLWxhbmRpbmctdXBkYXRlZCU1Q2xhbmRpbmdfcHJvamVjdCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDd0M7QUFDckg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXFRpbVJcXFxcQ29kZVxcXFxkb3BwZWwtbGFuZGluZy11cGRhdGVkXFxcXGxhbmRpbmdfcHJvamVjdFxcXFxhcHBcXFxcYXBpXFxcXGNoYXRcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2NoYXQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9jaGF0XCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9jaGF0L3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcVGltUlxcXFxDb2RlXFxcXGRvcHBlbC1sYW5kaW5nLXVwZGF0ZWRcXFxcbGFuZGluZ19wcm9qZWN0XFxcXGFwcFxcXFxhcGlcXFxcY2hhdFxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5CTimR%5CCode%5Cdoppel-landing-updated%5Clanding_project%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CTimR%5CCode%5Cdoppel-landing-updated%5Clanding_project&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "?32c4":
/*!****************************!*\
  !*** bufferutil (ignored) ***!
  \****************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?66e9":
/*!********************************!*\
  !*** utf-8-validate (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?d272":
/*!********************************!*\
  !*** supports-color (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/google-auth-library","vendor-chunks/uuid","vendor-chunks/ws","vendor-chunks/gaxios","vendor-chunks/whatwg-url","vendor-chunks/jws","vendor-chunks/debug","vendor-chunks/json-bigint","vendor-chunks/google-logging-utils","vendor-chunks/tr46","vendor-chunks/https-proxy-agent","vendor-chunks/gcp-metadata","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/agent-base","vendor-chunks/node-fetch","vendor-chunks/@google","vendor-chunks/webidl-conversions","vendor-chunks/safe-buffer","vendor-chunks/ms","vendor-chunks/jwa","vendor-chunks/is-stream","vendor-chunks/gtoken","vendor-chunks/extend","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bignumber.js","vendor-chunks/base64-js"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5CTimR%5CCode%5Cdoppel-landing-updated%5Clanding_project%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CTimR%5CCode%5Cdoppel-landing-updated%5Clanding_project&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();