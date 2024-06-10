import React, { useState, useEffect } from "react"; // React와 훅(useState, useEffect)을 임포트합니다.
import "./Nav.css"; // Nav 컴포넌트의 스타일을 적용할 CSS 파일을 임포트합니다.
import { useNavigate } from "react-router-dom";

export default function Nav() {
  // show라는 상태 변수를 선언하고 초기값을 false로 설정합니다.
  // setShow는 show 상태를 업데이트하는 함수입니다.
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 한 번 실행되는 코드를 작성합니다.
  useEffect(() => {
    // window 객체에 스크롤 이벤트 리스너를 추가합니다.
    window.addEventListener("scroll", () => {
      console.log("window.scrollY", window.scrollY); // 현재 스크롤 위치를 콘솔에 출력합니다.
      if (window.scrollY > 50) {
        setShow(true); // 스크롤 위치가 50을 초과하면 show 상태를 true로 설정합니다.
      } else {
        setShow(false); // 그렇지 않으면 show 상태를 false로 설정합니다.
      }
    });

    // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []); // 빈 배열을 두 번째 인수로 제공하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`)
  };

  // JSX를 반환합니다. JSX는 JavaScript 내에서 HTML과 유사한 문법을 사용하여 UI를 정의하는 방법입니다.
  return (
    // nav 요소를 반환합니다. show 상태가 true이면 nav__black 클래스가 추가됩니다.
    <nav className={`nav ${show && "nav__black"}`}>
      {/* Netflix 로고 이미지. 클릭 시 페이지를 새로고침합니다. */}
      <img
        alt="Netflix logo" // 이미지가 로드되지 않을 때 대체 텍스트로 사용됩니다.
        src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=700&h=456"
        className="nav__logo" // nav__logo라는 CSS 클래스를 적용합니다.
        onClick={() => window.location.reload()} // 클릭 시 페이지를 새로고침합니다.
      />

      <input value={searchValue} onChange={handleChange} className="nav_input" type="text" placeholder="영화를 검색해주세요."/>

      {/* 사용자 아바타 이미지 */}
      <img
        alt="User logged" // 이미지가 로드되지 않을 때 대체 텍스트로 사용됩니다.
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
        className="nav__avatar" // nav__avatar라는 CSS 클래스를 적용합니다.
      />
    </nav>
  );
}

/*
문법 설명

1. import 문: 다른 파일이나 모듈에서 함수, 객체, 변수 등을 가져올 때 사용합니다.
   import React, { useState, useEffect } from 'react'; // React와 훅(useState, useEffect)을 임포트합니다.
   import "./Nav.css"; // Nav 컴포넌트의 스타일을 적용할 CSS 파일을 임포트합니다.

2. React 컴포넌트: 기본적으로 함수로 정의된 컴포넌트입니다.
   export default function Nav() {

3. useState: 함수형 컴포넌트에서 상태 변수를 사용하게 해주는 훅입니다.
   const [show, setShow] = useState(false); // show라는 상태 변수를 선언하고 초기값을 false로 설정합니다. setShow는 show 상태를 업데이트하는 함수입니다.

4. useEffect: 컴포넌트가 렌더링될 때나 상태가 변경될 때 특정 작업을 수행하게 해주는 훅입니다.
   useEffect(() => {
     // window 객체에 스크롤 이벤트 리스너를 추가합니다.
     window.addEventListener("scroll", () => {
       console.log('window.scrollY', window.scrollY); // 현재 스크롤 위치를 콘솔에 출력합니다.
       if (window.scrollY > 50) {
         setShow(true); // 스크롤 위치가 50을 초과하면 show 상태를 true로 설정합니다.
       } else {
         setShow(false); // 그렇지 않으면 show 상태를 false로 설정합니다.
       }
     });

     // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너를 제거합니다.
     return () => {
       window.removeEventListener("scroll", () => {});
     };
   }, []); // 빈 배열을 두 번째 인수로 제공하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

5. JSX: JavaScript 내에서 HTML과 유사한 문법을 사용하여 UI를 정의하는 방법입니다.
   return (
     // nav 요소를 반환합니다. show 상태가 true이면 nav__black 클래스가 추가됩니다.
     <nav className={`nav ${show && "nav__black"}`}>
       // Netflix 로고 이미지. 클릭 시 페이지를 새로고침합니다.
       <img
         alt="Netflix logo" // 이미지가 로드되지 않을 때 대체 텍스트로 사용됩니다.
         src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=700&h=456"
         className="nav__logo" // nav__logo라는 CSS 클래스를 적용합니다.
         onClick={() => window.location.reload()} // 클릭 시 페이지를 새로고침합니다.
       />
       // 사용자 아바타 이미지
       <img
         alt="User logged" // 이미지가 로드되지 않을 때 대체 텍스트로 사용됩니다.
         src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
         className='nav__avatar' // nav__avatar라는 CSS 클래스를 적용합니다.
       />
     </nav>
   );
*/
