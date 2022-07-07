export default function updateLocalstorage(watchList) {
  localStorage.setItem("watchList", JSON.stringify(watchList));
}
