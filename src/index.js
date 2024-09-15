import "./style/style.css";
import "flatpickr/dist/flatpickr.min.css";
import controller from "./controller/controller";

controller.getLists();
let menu_new = document.getElementById("menu_btn_new");
menu_new.addEventListener("click", (e) => controller.addItem(e));
let menu_today = document.getElementById("menu_btn_today");
menu_today.addEventListener("click", () => controller.getToday());
let menu_all = document.getElementById("menu_btn_all");
menu_all.addEventListener("click", () => controller.getAll());