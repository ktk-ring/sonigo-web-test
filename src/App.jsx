import './App.css';
import { useRef } from 'react'
import { useState } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import React from 'react';
import titleImage from './img/Title.JPG';
import thanksImage from './img/thanks.gif';
import posterImage from './img/poster.png';
import submitImage from './img/당장매수해.png';
import howToBuyImage from './img/howtobuy.png';

import './bottomSheet.css'

export default function App() {
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [isHiddenModalVisible, setIsHiddenModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [instagramID, setInstagramID] = useState('');
  const [images, setImages] = useState([]);
  const [text, setText] = useState('');

  const handleInstagramIDChange = (event) => {
    setInstagramID(event.target.value);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages(newImages);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => { // 폼 데이터를 전송하는 부분입니다.
    event.preventDefault();
    const formData = new FormData();
    formData.append('ID', instagramID);
    images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });
    formData.append('Text', text);
    alert('사진이 전송되었습니다!');
    showModal();
    setInstagramID("");
    setImages([]);
    setText("");
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showHiddenModal = () => {
    setIsHiddenModalVisible(true);
    setTimeout(() => {
      setIsHiddenModalVisible(false);
    }, 3000);
  };

  return (
    <>
      <body className="App-header">
        <img src={titleImage} className="image" />
        <h2>사진 기부하고 손이고를 돕자!!</h2>
        <div className="graph">
          [그래프]<br />
          []
          <ol>
            <button className="button">1일</button>
            <button className="button">3일</button>
            <button className="button">1주</button>
            <button className="button">1년</button>
            <button className="button">5년</button>
          </ol>
        </div>
        <p>
          안녕하세요 사랑하는 팔로워님들<br />
          손이고임미다.
          <br /><br />
          일반 머리를 위한 사진을 모으기 위해 이 웹싸이트를 만들었습니다. 사람들이 미용실에 갈 때 확실한 예시를 만들어 주고 싶거든요.
          <br /><br />
          물논 지금 DM으로 여러분의 머리를 받고 잇찌만,,,!!!
          그게 여의치 않은 상황입니다,,,,,,,,,
          <br /><br />
          그래서 열씸이 코딩을 배워서 웹싸이트를 만들었읍니다…
          <br /><br />
          쨋든 이뿌고, 근사하고, 뽀대나는 머리 사진 많이 보내주시면 감사티비 하도록 하겠습니다. 사진 보내주면 손이고를 저점매수도 하고 이뿐 사진도 보내고!! 1석 2조 짱이죠~~~!!!!
          <br /><br />
          정말정말 감사합니다 사랑해요 아이러브유언제나건강하세요하트뿅뿅뽀뽀쪽
        </p>
        <button className="thanks"
          onClick={showHiddenModal}>
          <img src={posterImage} alt="" />
        </button>
        <div className={`hidden-modal ${isHiddenModalVisible ? 'visible' : 'hidden'}`}>
          여러분 사<br />랑합니다🧡💜💛🧡❤️💜💛🧡<br />손이고 파이팅!!!
        </div>

        <img className="image"
          style={{ marginBottom: "20vw" }}
          src={howToBuyImage} alt="" />
        <button
          className="submit button"
          type="submit"
          form="form"
          onClick={(e) => {
            e.preventDefault();
            if (openBottomSheet) {
              // if (instagramID === '') {
              //   alert('인스타그램 아이디를 입력해주세요!');
              //   return;
              // }
              // if (images.length === 0) {
              //   alert('사진을 업로드해주세요!');
              //   return;
              // }
              // if (text === '') {
              //   alert('메시지를 입력해주세요!');
              //   return;
              // }
              handleSubmit(e);  // 폼 제출
              setOpenBottomSheet(false);
            } else {
              setOpenBottomSheet(true);
            }
          }}>
          <img
            className="submit-image"
            src={submitImage} alt="Submit" />
        </button>

        <BottomSheet className="form"
          open={openBottomSheet}
          blocking={false}
          onDismiss={() => setOpenBottomSheet(false)}
          snapPoints={({ minHeight, maxHeight }) => [maxHeight * 0.9]}
        >
          <form id="form" onSubmit={handleSubmit}>
            <h1>손이고 저점매수하기</h1>

            <div className="form-group">
              <div className="input-container">
                <div className="decorative-text">
                  @
                </div>
                <label htmlFor="instagramID">
                  인스타그램 아이디를 입력해주세요!<br />
                </label>
                <input
                  className="input"
                  style={{ paddingLeft: "2.2em", width: "15em" }}
                  id="instagramID"
                  type="text"
                  value={instagramID}
                  onChange={handleInstagramIDChange}
                  placeholder="sonnimigungodegiyeyo"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="images">
                본인 머리 사진을 업로드해주세요!!<br />
              </label>
              <input
                className="input"
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />

              <div className={`image-preview ${images.length > 0 ? 'has-images' : ''}`}>
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Preview ${index}`}
                    className="preview-image"
                  />
                ))}
              </div>
            </div>

            <div className="form-group" style={{ paddingBottom: "80px" }}>
              <label htmlFor="text">
                손이고에게 하고 싶은 말이 있다면 남겨주세요!!!<br />
              </label>
              <input
                className="input"
                id="text"
                type="text"
                value={text}
                onChange={handleTextChange}
                placeholder="손이고 팔로워분들 사랑합니다"
              />
            </div>
          </form>
        </BottomSheet>
          <div className={`modal ${isModalVisible ? 'visible' : 'hidden'}`}>
            <img className={`modal-image ${isModalVisible ? 'visible' : 'hidden'}`} src={thanksImage} />
            <p>시간 내주셔서 감사합니다!!</p>
            <button className="button" onClick={closeModal}>닫기</button>
          </div>
      </body>
    </>
  );
}
