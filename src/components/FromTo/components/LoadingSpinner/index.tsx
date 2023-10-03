import React from "react";
import { ContainerLoadingSpinner } from "./styles";

function LoadingSpinner(): JSX.Element {
  return (
    <ContainerLoadingSpinner>
      <svg
        className="spinner"
        xmlns="http://www.w3.org/2000/svg"
        width="104"
        height="104"
        viewBox="0 0 104 104"
        fill="none"
      >
        <g clipPath="url(#clip0_3011_8825)">
          <path
            d="M52 97.76C52 101.206 49.1962 104.039 45.7748 103.626C37.6948 102.652 29.9255 99.7901 23.1103 95.2364C14.559 89.5226 7.89402 81.4013 3.95826 71.8995C0.022504 62.3978 -1.00727 51.9423 0.999167 41.8553C3.0056 31.7683 7.95811 22.5028 15.2304 15.2304C22.5028 7.95811 31.7683 3.00559 41.8553 0.999163C51.9423 -1.00727 62.3978 0.0225056 71.8995 3.95826C81.4013 7.89402 89.5226 14.559 95.2364 23.1103C99.7901 29.9255 102.652 37.6948 103.626 45.7748C104.039 49.1963 101.206 52 97.76 52C94.3137 52 91.5703 49.1891 91.0284 45.7858C90.1356 40.1789 88.041 34.805 84.8597 30.0439C80.5172 23.5448 74.345 18.4795 67.1236 15.4883C59.9023 12.4971 51.9562 11.7145 44.29 13.2394C36.6239 14.7642 29.5821 18.5282 24.0551 24.0551C18.5282 29.5821 14.7643 36.6239 13.2394 44.29C11.7145 51.9562 12.4971 59.9023 15.4883 67.1236C18.4795 74.345 23.5448 80.5172 30.0439 84.8597C34.805 88.041 40.1789 90.1356 45.7857 91.0284C49.1891 91.5703 52 94.3137 52 97.76Z"
            fill="url(#paint0_linear_3011_8825)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_3011_8825"
            x1="94.7874"
            y1="45.6535"
            x2="52"
            y2="98.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#A899F1" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
          <clipPath id="clip0_3011_8825">
            <rect width="104" height="104" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </ContainerLoadingSpinner>
  );
}

export default LoadingSpinner;
