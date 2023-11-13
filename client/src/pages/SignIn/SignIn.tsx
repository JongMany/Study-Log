import React, { useEffect, useState } from 'react';
import Input from '../../components/Input/Input.component';
import useInput from '../../hooks/form/useInput';
import Button from '../../components/Button/Button.component';
import ModalPortal from '../../components/Portal/ModalPortal.component';
import SignUpModal from '../../components/Modal/SignUpModal.component';
import ModalWrapper from '../../components/Modal/ModalWrapper.component';
import useLoginState from '../../stores/login';
import { useNavigate } from 'react-router-dom';
import useNetwork from '../../stores/network';

const initialForm = {
  id: '',
  password: '',
};

export default function SignIn() {
  const [form, onChangeHandler] = useInput(initialForm);
  const [showModal, toggleShowModal] = useState(false);
  const { httpInterface } = useNetwork();
  const { isLogin, signIn } = useLoginState();
  const navigate = useNavigate();
  console.log(httpInterface);

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // httpInterface.signIn({ id: form.id, password: form.password }).then((res) => {
    //   console.log(res);
    //   signIn({id: form.id, name: '나중에 구현할 내용(백엔드가 넘겨줘야 함)'});
    // });
    signIn({ id: form.id, name: '나중에 구현할 내용(백엔드가 넘겨줘야 함)' });
  };

  useEffect(() => {
    isLogin && navigate('/');
  }, [isLogin, navigate]);

  return (
    <form onSubmit={loginHandler}>
      <Input
        type='text'
        onChangeHandler={onChangeHandler}
        name='id'
        value={form.id}
      />
      <Input
        type='text'
        onChangeHandler={onChangeHandler}
        name='password'
        value={form.password}
      />
      <Button type='submit' text='로그인' />
      <Button
        type='button'
        text='회원가입'
        onClick={() => toggleShowModal((prev) => !prev)}
      />

      {showModal && (
        <ModalPortal>
          <ModalWrapper
            show={showModal}
            closeModal={() => toggleShowModal(false)}
          >
            <SignUpModal />
          </ModalWrapper>
        </ModalPortal>
      )}
    </form>
  );
}
