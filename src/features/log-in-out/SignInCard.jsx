import styled from "styled-components";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../ui/ErrorMessage";
import useLogin from "./useLogin";
import SpinnerLoader from "../../ui/SpinnerLoader";
import { device } from "../../styles/RWDPointSettings";

const StyledCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 2rem;
  /* align-items: center; */

  ${device.tablet} {
    gap: 1rem;
  }
`;

const CommonDiv = styled.div`
  width: 100%;
  /* height: 36px; */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  opacity: ${(props) => (props.$isloading === "true" ? 1 : 0)};
`;

const Input = styled.input.attrs((props) => ({ type: props.$inputtype || "text" }))`
  width: 100%;
  border: none;
  border-bottom: 2px solid;
  border-image: linear-gradient(to right, grey, grey) 10;
  padding: 0.5rem;
  position: relative;

  &:focus {
    outline: none;
    border-image: linear-gradient(to right, #1999fb, #fd25bc) 10;
  }

  &:focus + span {
    transform: translateY(-4rem);
    color: var(--color-grey-600);
    cursor: auto;
  }
`;

const StyledLabel = styled.label`
  position: relative;
  display: flex;
`;

const StyledSpan = styled.span`
  width: max-content;
  color: var(--color-grey-400);
  font-weight: 500;
  transition: all 0.25s;
  position: ${(props) => props.$position || "relative"};
  top: ${(props) => (props.$position ? ".5rem" : null)};
  transform: ${(props) => (props.$hasvalue === "true" ? "translateY(-4rem)" : null)};
  &:hover {
    color: var(--color-grey-600);
  }
`;

const StyledSvg = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  right: 1rem;
  top: 25%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const ForgetPWButton = styled.button`
  width: max-content;
  border-radius: 5px;
  background-color: transparent;
  border: none;
  color: var(--color-grey-400);
  font-weight: 400;
  transition: all 0.25s;
  &:hover {
    color: var(--color-grey-500);
  }
`;

const SignInCard = () => {
  const [visible, setVisible] = useState(false);
  const [hasId, setHasId] = useState("false");
  const [hasPassWord, setHasPassWord] = useState("false");

  const { login, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userId: "test@test.com",
      userPassWord: "123456",
    },
  });

  useEffect(() => {
    if (hasPassWord) setHasPassWord("true");
    if (hasId) setHasId("true");
  }, [hasPassWord, hasId]);
  //   if (isLoading) return <Spinner />;

  function changeVisiible() {
    setVisible((prev) => !prev);
  }

  function changeIdInput(e) {
    console.log(e.target.value);
    if (e.target.value) {
      setHasId("true");
    } else {
      setHasId("false");
    }
  }

  function changePWInput(e) {
    console.log(e.target.value);
    if (e.target.value) {
      setHasPassWord("true");
    } else {
      setHasPassWord("false");
    }
  }

  function handleLogin(data) {
    login(data);
  }

  return (
    <StyledCard>
      <h2>登入 Sign In</h2>
      <div></div>
      <div></div>
      <StyledCard>
        <Input
          disabled={isLoading}
          defaultValue="test@test.com"
          {...register("userId", { required: "這是必填項目" })}
          onBlur={changeIdInput}
        />
        <StyledSpan $hasvalue={hasId} $position="absolute">
          請輸入帳號
        </StyledSpan>
        <ErrorMessage error={errors.userId?.type} />
      </StyledCard>
      <div></div>
      <div></div>
      <StyledCard>
        <StyledLabel>
          <Input
            disabled={isLoading}
            defaultValue="123456"
            {...register("userPassWord", { required: "這是必填項目" })}
            $inputtype={visible ? "text" : "password"}
            onBlur={changePWInput}
          />
          <StyledSpan $hasvalue={hasPassWord} $position="absolute">
            請輸入密碼
          </StyledSpan>
        </StyledLabel>
        <ErrorMessage error={errors.userPassWord && errors.userPassWord} />
        <StyledSvg onClick={changeVisiible}>{visible ? <ImEyeBlocked /> : <ImEye />}</StyledSvg>
      </StyledCard>

      <CommonDiv $isloading={isLoading === true ? "true" : "false"}>
        <SpinnerLoader />
        <span>登入中..</span>
      </CommonDiv>

      <Button disabled={isLoading} type="confirm" onClick={handleSubmit(handleLogin)}>
        登入
      </Button>
      <ForgetPWButton> 忘記密碼</ForgetPWButton>
    </StyledCard>
  );
};

export default SignInCard;
