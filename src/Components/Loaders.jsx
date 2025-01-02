import styled from "styled-components";

export const DotLoader = styled.div`
 width: 56px;
   height: 26.9px;
   background: radial-gradient(circle closest-side,#474bff 90%,#0000) 0%   50%,
          radial-gradient(circle closest-side,#474bff 90%,#0000) 50%  50%,
          radial-gradient(circle closest-side,#474bff 90%,#0000) 100% 50%;
   background-size: calc(100%/3) 13.4px;
   background-repeat: no-repeat;
   animation: dots-7ar3yq 1s infinite linear;
   @keyframes dots-7ar3yq {
   20% {
      background-position: 0%   0%, 50%  50%,100%  50%;
   }

   40% {
      background-position: 0% 100%, 50%   0%,100%  50%;
   }

   60% {
      background-position: 0%  50%, 50% 100%,100%   0%;
   }

   80% {
      background-position: 0%  50%, 50%  50%,100% 100%;
   }
}
`
export const Spinner = styled.div`
position: relative;
left:42%;
  width: 56px;
   height: 56px;
   border-radius: 50%;
   border: 9px solid;
   border-color: #254336 #0000;
   animation: spinner-0tkp9a 1s infinite;

  @keyframes spinner-0tkp9a {
   to {
      transform: rotate(.5turn);
   }
`;

export const Blob = styled.div`
 width: 89.6px;
   height: 89.6px;
   border: 11.2px solid #0000;
   background: radial-gradient(farthest-side,#474bff 98%,#0000 ) 0    0/22.4px 22.4px,
          radial-gradient(farthest-side,#474bff 98%,#0000 ) 100% 0/22.4px 22.4px,
          radial-gradient(farthest-side,#474bff 98%,#0000 ) 100% 100%/22.4px 22.4px,
          radial-gradient(farthest-side,#474bff 98%,#0000 ) 0 100%/22.4px 22.4px,
          linear-gradient(#474bff 0 0) center/44.8px 44.8px,
          #fff;
   background-repeat: no-repeat;
   filter: blur(4.5px) contrast(10);
   animation: blob-xa27qk 0.8s infinite;
}
   @keyframes blob-xa27qk {
   100% {
      background-position: 100% 0,100% 100%,0 100%,0 0,center;
   }
}
`