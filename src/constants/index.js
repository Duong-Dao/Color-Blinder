const generateRGB = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return { r, g, b };
};

// 1 obj
const mutateRGB = ({ r, g, b }, level) => {
  const newR = r + Math.floor(Math.random() * level) + 5;
  const newG = g + Math.floor(Math.random() * level) + 5;
  const newB = b + Math.floor(Math.random() * level) + 5;
  return { r: newR, g: newG, b: newB };
};

const convertTime = (sec) => {
  // var hours = Math.floor(sec / 3600);
  // hours >= 1 ? (sec = sec - hours * 3600) : (hours = "00");
  var min = Math.floor(sec / 60);
  min >= 1 ? (sec = sec - min * 60) : (min = "00");
  min.toString().length === 1 ? (min = "0" + min) : void 0;

  sec.toString().length === 1 ? (sec = "0" + sec) : void 0;

  // return hours + " giờ " + min + " phút" + sec;
  return min + ":" + sec;
};

export { generateRGB, mutateRGB, convertTime };
