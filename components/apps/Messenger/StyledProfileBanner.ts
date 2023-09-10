import styled from "styled-components";

const StyledProfileBanner = styled.div`
  background: linear-gradient(rgba(255, 255, 255, 25%), rgba(0, 0, 0, 50%));
  border-bottom: 1px solid rgb(57, 58, 59);
  color: #fff;
  display: flex;
  font-size: 24px;
  font-weight: 700;
  height: 60px;
  max-height: 60px;
  min-height: 60px;
  padding: 8px 15px;
  place-content: space-between;
  place-items: center;
  position: relative;
  text-shadow: 1px 1px 1px #000;

  figure {
    display: flex;
    flex-direction: row-reverse;
    gap: 15px;

    svg,
    img {
      aspect-ratio: 1/1;
      border: 2px solid #fff;
      border-radius: 50%;
      height: 38px;
      max-height: 38px;
      max-width: 38px;
      min-height: 38px;
      min-width: 38px;
      width: 38px;
    }

    figcaption {
      padding-top: 1px;
    }
  }

  button {
    cursor: pointer;
    height: 30px;
    padding-top: 3px;
    width: 30px;

    svg:first-child {
      background-color: rgb(0, 0, 0, 50%);
      border-radius: 5px;
      color: #fff;
      fill: #fff;
      height: 24px;
      outline: 4px solid rgb(0, 0, 0, 50%);
      pointer-events: none;
      width: 24px;
    }

    &:hover {
      svg:first-child {
        background-color: rgb(0, 0, 0, 75%);
        outline: 4px solid rgb(0, 0, 0, 75%);
      }
    }
  }

  ol {
    bottom: 6px;
    display: flex;
    flex-direction: row;
    gap: 2px;
    max-width: calc(100% - 67px - 50px);
    overflow: hidden;
    place-content: flex-end;
    position: absolute;
    right: 68px;

    li {
      font-size: 7px;
    }
  }
`;

export default StyledProfileBanner;