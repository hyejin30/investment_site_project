import styled from 'styled-components';

import Logo from 'components/atoms/Logo';

import { flex, theme } from 'styles';

function TopHeader() {
  return (
    <Wrapper>
      <Logo path="/" />
      <button type="button">초급</button>
      <button type="button">중급</button>
      <button type="button">고급</button>
      <LoginBtn>로그인 하러가기</LoginBtn>
    </Wrapper>
  );
}

export default TopHeader;

const Wrapper = styled.div`
  ${flex('space-between', 'center')};
  width: 100%;
`;

const LoginBtn = styled.button`
  color: ${theme.red};
`;