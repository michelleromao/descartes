import React from 'react';

import video from "../../assets/video/video_conceitual.mp4";
import videoThumb from "../../assets/video/video.svg";

import youtube from "../../assets/youtube.png";
import instagram from "../../assets/instagram.png";

import './styles.css';

function AboutSection() {
  return (
    <div className='TamanhoCorpoSobre' id="about">
      <div className="sobre-titulo">
              <h2>Somos uma rede colaborativa que ajuda você,</h2>
              <h2 className="h2-azul">empresa e artesão</h2>
              
            </div>
            <div className="sobre">
                <div className="texto-sobre">
                
                <h4 className="confira">Confira o vídeo e saiba como atuamos!</h4><br/>
                <p>
                  A quantidade de resíduos sólidos que são descartados
                  de maneira incorreta tem sido um dos maiores
                  problemas dentro da nossa sociedade. Assim, a
                  <strong> Descartes</strong>, vem para auxiliar o gereciamento desses
                  resíduos, atuando como intermediário entre empresas
                  que quere destinar seus resíduos sólidos descartáveis
                  para pessoas que as utilizarão para fins artesanais.
                </p>
                <h4 className="acompanhe">Acompanhem nas nossas redes sociais:</h4><br/>
                <div className="redes">
                  <a href="https://www.youtube.com/channel/UCECIHlguuhCiSk24xiSWCew/featured">
                    <img src={youtube} id='ytb' alt="youtube logo"></img>/projetodescartes</a>
                  <a href="https://www.instagram.com/projetodescartes/">
                    <img src={instagram} id='insta' alt="instagram logo"></img>/projetodescartes</a>
                </div>
              </div>
              <div className="video">
                <video controls poster={videoThumb} className="video-content">
                  <source src={video} type="video/mp4"></source>
                </video>
              </div>

            </div>
    </div>
  );
}

export default AboutSection;
