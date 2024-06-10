import axios from "../api/axios"; // 설정한 axios 인스턴스를 임포트합니다.
import React, { useEffect, useState } from "react"; // React와 훅(useEffect, useState)을 임포트합니다.
import requests from "../api/requests"; // API 요청 엔드포인트 설정을 임포트합니다.
import "./Banner.css"; // 배너 스타일을 적용할 CSS 파일을 임포트합니다.
import styled from "styled-components"; // styled-components 라이브러리를 임포트합니다.

export default function Banner() {
  // 영화 정보를 저장할 상태 변수를 정의합니다.
  const [movie, setMovie] = useState([]);
  const [isClicked, setisClicked] = useState(false); // 버튼 클릭 여부를 저장할 상태 변수를 정의합니다.

  // 컴포넌트가 마운트될 때 fetchData 함수를 호출합니다.
  useEffect(() => {
    fetchData();
  }, []); // 빈 배열을 두 번째 인수로 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 합니다.

  // 비동기 함수를 정의합니다.
  const fetchData = async () => {
    // 현재 상영 중인 영화 정보를 가져옵니다.
    // await 키워드는 해당 요청이 완료될 때까지 기다립니다.
    const request = await axios.get(requests.fetchNowPlaying);

    // 여러 영화 중 랜덤으로 하나의 영화 ID를 가져옵니다.
    // request.data.results는 API 응답 데이터에서 results 배열을 가져옵니다.
    // results 배열은 현재 상영 중인 영화 목록을 포함합니다.
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length) // 0과 results.length 사이의 랜덤 인덱스를 생성합니다.
      ].id;

    // 특정 영화의 더 상세한 정보를 가져옵니다.
    // movieId를 사용하여 해당 영화의 상세 정보를 요청합니다.
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });

    // 영화 정보를 상태에 저장합니다.
    setMovie(movieDetail);
  };

  // 문자열을 지정된 길이로 자르고, 초과할 경우 끝에 "..."을 추가하는 함수입니다.
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  // isClicked 상태에 따라 다른 JSX를 반환합니다.
  if (!isClicked) {
    return (
      <header
        className="banner"
        // 인라인 스타일을 설정합니다.
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`, // 영화의 배경 이미지를 설정합니다.
          backgroundPosition: "top center", // 배경 이미지 위치를 설정합니다.
          backgroundSize: "cover", // 배경 이미지 크기를 설정합니다.
        }}
      >
        <div className="banner__contents">
          <h1>{movie.title || movie.name || movie.original_name}</h1>
          {/* 영화 제목을 표시합니다. */}
          <div className="banner__buttons">
            <button
              className="banner__button play"
              onClick={() => setisClicked(true)}
            >
              Play
            </button>
            {/* 재생 버튼 */}
            <button className="banner__button info">More Information</button>
            {/* 추가 정보 버튼 */}
          </div>
          <h1 className="banner__description">
            {truncate(movie.overview, 100)}
          </h1>
          {/* 영화 설명을 표시합니다. */}
        </div>
        <div className="banner--fadeBottom" />
        {/* 배너의 하단 페이드 효과를 위한 div */}
      </header>
    );
  } else {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            width="640"
            height="360"
            frameBorder="0"
            allow="autoplay; fullscreen"
          />
        </HomeContainer>
      </Container>
    );
  }
}

// styled-components를 사용하여 스타일을 정의합니다.
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vmin;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;


