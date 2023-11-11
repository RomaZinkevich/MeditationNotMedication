import React from "react";
import {useParams} from "react-router";

import NavBar from "../components/NavBar";
import AudioPlayer from "../components/AudioPlayer";
import "../styles/components/exercise.scss";

function Exercise() {
  const {id} = useParams();

  const data = {
    g_id: id,
    name: "Calm yourself",
    author: "",
    cover: "https://imgs.search.brave.com/cWYNw0GyHwdKk7LwbDCQvhlaU2w_81meITJGxw-VNYg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/dHdvLXRvbmUtaW5r/LWNsb3VkLmpwZz93/aWR0aD0xMDAwJmZv/cm1hdD1wanBnJmV4/aWY9MCZpcHRjPTA",
    musicSrc: "https://rr3---sn-ixh7yn7d.googlevideo.com/videoplayback?expire=1699738914&ei=wqBPZbeWJf6Tv_IPrOyNkAk&ip=93.106.6.199&id=o-AGpMO_4dE1Yooskmc3GdQrPsl-hbDL96UCunHYnc8v8-&itag=251&source=youtube&requiressl=yes&spc=UWF9f7ZSC7uPUIhBzwCWX5iHLnqWyhLqHSz4ZEUC7w&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=X_s6ODtaBlIaRLCSkOyI5pgP&gir=yes&clen=847446&dur=52.461&lmt=1699710902653383&keepalive=yes&fexp=24007246,24350018&beids=24350018&c=WEB&txp=5318224&n=RZFrEbyADI0ehw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=ANLwegAwRAIgWtTKfLSGnNKdTNEc4l9PIpvtEduPmhBCAONeUHfYCgsCIBoNa_dhGj1cZPlB8otO1eX18ITouevKX1QVMQj22BXt&rm=sn-ixhe7z&req_id=38898e91e083a3ee&ipbypass=yes&redirect_counter=2&cm2rm=sn-4ox-uh2e7l&cms_redirect=yes&cmsv=e&mh=yX&mip=2a00:1778:1:997:48ad:fb01:8251:bf9d&mm=29&mn=sn-ixh7yn7d&ms=rdu&mt=1699720628&mv=m&mvi=3&pl=32&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AM8Gb2swRQIgeMSOfB5nI5yn5uVNZnPjraMatnpSJy92QDQj5dao_ssCIQC8uLGGZ_Ja-dCei4ofyTMRu45NMp0dJDrkWNRR0RB5fA%3D%3D",
  };

  return (
    <>
      <NavBar />
      <div className="exercise-page">
        <header>
          <h1>{data.name}</h1>
          <h1><a href="/">Back</a></h1>
        </header>

        <div className="music-player">
          <div className="image-container">
            <img
              src={data.cover}
              alt=""
              className="main-img"
            />
          </div>
          <AudioPlayer src={data.musicSrc} />
        </div>
      </div>
    </>

  );
}

export default Exercise;
