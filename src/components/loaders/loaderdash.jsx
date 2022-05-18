import React from 'react'
import ContentLoader from 'react-content-loader'

function Loaderdash(props) {
  return (
      <div className='loader dash'>
<ContentLoader 
    speed={2}
    width={300}
    height={160}
    viewBox="0 0 250 110"
    backgroundColor="#d6d6d6"
    foregroundColor="#ecebeb"
    {...props}
  >
    <path d="M 16.351 4.31 V 0.794 H 4.23 V 4.31 H 0.123 v 59.656 H 4.23 v 4.077 H 16.35 v -4.077 h 33.287 v 4.077 H 61.76 v -4.077 h 4.383 V 4.31 H 61.76 V 0.794 H 49.638 V 4.31 H 16.351 z M 92.801 4.31 V 0.794 H 80.68 V 4.31 h -4.108 v 59.656 h 4.108 v 4.077 H 92.8 v -4.077 h 33.287 v 4.077 h 12.121 v -4.077 h 4.384 V 4.31 h -4.384 V 0.794 h -12.121 V 4.31 H 92.8 z M 173.629 4.31 V 0.794 h -12.122 V 4.31 H 157.4 v 59.656 h 4.107 v 4.077 h 12.122 v -4.077 h 33.286 v 4.077 h 12.122 v -4.077 h 4.383 V 4.31 h -4.383 V 0.794 h -12.122 V 4.31 H 173.63 z" /> 
    <path d="M 59.585 95.56 V 77 h 3.94 v 15.31 h 7.53 v 3.25 h -11.47 z M 77.055 88.44 c 0 1.4 0.23 2.47 0.69 3.18 c 0.46 0.73 1.21 1.08 2.26 1.08 c 1.03 0 1.77 -0.35 2.22 -1.07 c 0.46 -0.71 0.68 -1.78 0.68 -3.19 s -0.23 -2.46 -0.68 -3.16 c -0.46 -0.7 -1.21 -1.05 -2.25 -1.05 c -1.03 0 -1.78 0.34 -2.23 1.04 c -0.46 0.7 -0.69 1.76 -0.69 3.17 z m 9.81 0 c 0 2.31 -0.61 4.12 -1.82 5.42 c -1.22 1.3 -2.92 1.95 -5.1 1.95 c -1.36 0 -2.56 -0.29 -3.6 -0.89 c -1.04 -0.6 -1.84 -1.45 -2.4 -2.57 c -0.56 -1.12 -0.84 -2.42 -0.84 -3.91 c 0 -2.32 0.61 -4.12 1.82 -5.41 s 2.91 -1.93 5.1 -1.93 c 1.36 0 2.57 0.3 3.61 0.89 c 1.04 0.59 1.84 1.44 2.4 2.55 c 0.55 1.11 0.83 2.41 0.83 3.9 z M 99.085 95.56 l -0.75 -1.93 h -0.11 c -0.65 0.82 -1.32 1.39 -2.01 1.71 c -0.69 0.32 -1.59 0.47 -2.7 0.47 c -1.36 0 -2.43 -0.38 -3.21 -1.16 c -0.79 -0.78 -1.18 -1.89 -1.18 -3.33 c 0 -1.51 0.53 -2.62 1.58 -3.33 c 1.06 -0.72 2.65 -1.11 4.77 -1.19 l 2.46 -0.07 v -0.63 c 0 -1.44 -0.73 -2.15 -2.21 -2.15 c -1.13 0 -2.46 0.34 -4 1.02 l -1.28 -2.61 c 1.64 -0.86 3.45 -1.28 5.44 -1.28 c 1.9 0 3.36 0.41 4.37 1.24 c 1.02 0.83 1.53 2.09 1.53 3.78 v 9.46 h -2.7 z m -1.15 -6.57 l -1.49 0.05 c -1.13 0.03 -1.97 0.23 -2.52 0.61 c -0.55 0.37 -0.82 0.93 -0.82 1.7 c 0 1.09 0.62 1.63 1.87 1.63 c 0.9 0 1.62 -0.25 2.16 -0.77 c 0.53 -0.52 0.8 -1.2 0.8 -2.06 v -1.16 z M 110.265 95.81 c -1.67 0 -2.98 -0.64 -3.93 -1.94 c -0.95 -1.29 -1.43 -3.09 -1.43 -5.38 c 0 -2.33 0.49 -4.14 1.46 -5.44 c 0.96 -1.3 2.3 -1.95 4 -1.95 c 1.79 0 3.15 0.7 4.09 2.08 h 0.12 c -0.19 -1.05 -0.29 -2 -0.29 -2.83 v -4.54 h 3.89 v 19.75 h -2.97 l -0.75 -1.84 h -0.17 c -0.88 1.4 -2.22 2.09 -4.02 2.09 z m 1.36 -3.08 c 0.99 0 1.71 -0.29 2.17 -0.86 c 0.46 -0.58 0.72 -1.56 0.76 -2.94 v -0.41 c 0 -1.53 -0.24 -2.62 -0.71 -3.28 c -0.46 -0.66 -1.23 -0.99 -2.29 -0.99 c -0.86 0 -1.53 0.37 -2.01 1.1 c -0.48 0.73 -0.72 1.79 -0.72 3.19 s 0.25 2.44 0.73 3.14 c 0.48 0.7 1.17 1.05 2.07 1.05 z M 122.055 77.7 c 0 -1.26 0.7 -1.89 2.11 -1.89 c 1.4 0 2.11 0.63 2.11 1.89 c 0 0.6 -0.18 1.07 -0.53 1.4 c -0.35 0.34 -0.88 0.5 -1.58 0.5 c -1.41 0 -2.11 -0.63 -2.11 -1.9 z m 4.04 17.86 h -3.87 V 81.37 h 3.87 v 14.19 z M 143.255 95.56 h -3.87 v -8.29 c 0 -1.02 -0.18 -1.79 -0.55 -2.3 c -0.36 -0.52 -0.94 -0.77 -1.74 -0.77 c -1.08 0 -1.86 0.36 -2.35 1.08 c -0.48 0.73 -0.72 1.93 -0.72 3.6 v 6.68 h -3.87 V 81.37 h 2.96 l 0.52 1.81 h 0.21 c 0.44 -0.68 1.03 -1.2 1.79 -1.55 c 0.76 -0.35 1.62 -0.53 2.58 -0.53 c 1.65 0 2.9 0.45 3.76 1.34 c 0.85 0.89 1.28 2.18 1.28 3.87 v 9.25 z M 159.595 81.37 v 1.97 l -2.22 0.57 c 0.4 0.63 0.61 1.34 0.61 2.13 c 0 1.52 -0.54 2.71 -1.6 3.56 c -1.06 0.85 -2.53 1.28 -4.42 1.28 l -0.7 -0.04 l -0.57 -0.06 c -0.4 0.3 -0.6 0.64 -0.6 1.01 c 0 0.56 0.71 0.84 2.14 0.84 h 2.41 c 1.55 0 2.74 0.33 3.56 1 c 0.81 0.67 1.22 1.65 1.22 2.95 c 0 1.66 -0.69 2.94 -2.07 3.86 c -1.39 0.91 -3.37 1.37 -5.96 1.37 c -1.98 0 -3.5 -0.35 -4.54 -1.04 c -1.05 -0.69 -1.57 -1.65 -1.57 -2.9 c 0 -0.85 0.27 -1.57 0.8 -2.14 c 0.53 -0.58 1.32 -0.99 2.35 -1.24 c -0.4 -0.17 -0.74 -0.44 -1.04 -0.83 c -0.3 -0.38 -0.45 -0.79 -0.45 -1.22 c 0 -0.54 0.16 -0.99 0.47 -1.35 c 0.32 -0.36 0.77 -0.72 1.36 -1.06 c -0.74 -0.33 -1.33 -0.84 -1.77 -1.55 c -0.44 -0.71 -0.65 -1.55 -0.65 -2.52 c 0 -1.55 0.5 -2.74 1.51 -3.59 c 1.01 -0.84 2.44 -1.27 4.31 -1.27 c 0.4 0 0.87 0.04 1.42 0.11 c 0.55 0.07 0.89 0.12 1.05 0.16 h 4.95 z m -10.96 16.2 c 0 0.53 0.26 0.95 0.77 1.25 c 0.51 0.31 1.23 0.46 2.15 0.46 c 1.39 0 2.48 -0.19 3.26 -0.57 c 0.79 -0.38 1.19 -0.9 1.19 -1.56 c 0 -0.54 -0.24 -0.9 -0.7 -1.11 c -0.47 -0.2 -1.19 -0.3 -2.16 -0.3 h -2.01 c -0.71 0 -1.3 0.17 -1.78 0.5 c -0.48 0.33 -0.72 0.78 -0.72 1.33 z m 1.41 -11.56 c 0 0.77 0.18 1.38 0.53 1.83 c 0.35 0.45 0.89 0.68 1.6 0.68 c 0.73 0 1.27 -0.23 1.6 -0.68 c 0.34 -0.45 0.51 -1.06 0.51 -1.83 c 0 -1.7 -0.7 -2.56 -2.11 -2.56 c -1.42 0 -2.13 0.86 -2.13 2.56 z" />
  </ContentLoader>
  </div>
  )
}

export default Loaderdash