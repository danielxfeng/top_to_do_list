import "./style/style.css";
import controller from "./controller/controller";
import ui from "./controller/ui.js";

controller.getLists();
let menu_new = document.getElementById("menu_btn_new");
menu_new.addEventListener("click", () => ui.addItem(controller));
let menu_today = document.getElementById("menu_btn_upcoming");
menu_today.addEventListener("click", () => controller.getUpcoming());
let menu_history = document.getElementById("menu_btn_past");
menu_history.addEventListener("click", () => controller.getPast());
let menu_all = document.getElementById("menu_btn_all");
menu_all.addEventListener("click", () => controller.getAll());