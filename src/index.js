import { loadavg } from "os";

const url =
  "https://www.videvo.net/videvo_files/converted/2015_01/preview/AMS__Big_Explosion.mov67018.webm";

const processor = function processor(src) {
  const video = document.createElement("video");
  const c1 = document.createElement("canvas");
  const ctx1 = c1.getContext("2d");
  const c2 = document.createElement("canvas");
  const ctx2 = c2.getContext("2d");

  let width = 0,
    height = 0;
  // const self = this

  const load = () => {
    video.src = src;
    video.controls = true;

    video.addEventListener("play", ev => {
      width = video.width / 2;
      height = video.height / 2;

      c1.id = "c1";
      c1.width = width;
      c1.height = height;

      c1.id = "c2";
      c2.width = width;
      c2.height = height;

      loop();
    });

    document.body.appendChild(video);
    document.body.appendChild(c1);
    document.body.appendChild(c2);
  };

  const loop = () => {
    console.log("looping");
    if (video.paused || video.ended) return;
    // computeFrame();
    window.requestAnimationFrame(loop);
  };

  const computeFrame = () => {
    ctx1.drawImage(video, 0, 0, width, height);
    const frame = ctx1.getImageData(0, 0, width, height);
    const l = frame.data.length / 4;

    for (let i = 0; i < l; i++) {
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];
      if (g > 100 && r <= 10 && b <= 10) frame.data[i * 4 + 3] = 0;
    }
  };
  load();
};

document.addEventListener("DOMContentLoaded", () => processor(url));
