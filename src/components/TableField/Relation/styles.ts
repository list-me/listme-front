import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  /* padding: 8px; */

  .tagContent {
    display: flex;
    flex-direction: row;

    width: 100% !important;
    overflow: hidden;

    div:not(:first-child) {
      margin-left: 0.5rem;
    }

    /* background-color: green; */
  }

  .imageContent {
    width: 18px;

    display: flex;
    justify-content: center;

    margin-right: -8px;
    padding: 0 8px 0 6px;

    svg {
      cursor: pointer;
    }
  }
`;

export const Tag = styled.div`
  min-width: 50px !important;
  height: 25px !important;

  border-radius: 6px;
  padding: 0px 6px;

  background: #dee2e6;

  label {
    overflow: hidden;

    align-self: center;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover {
      cursor: pointer;
    }
  }

  &:hover {
    cursor: pointer;
  }
`;
