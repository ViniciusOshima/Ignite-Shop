import { styled } from '../index'

import * as Dialog from '@radix-ui/react-dialog';
import * as ScrollArea from '@radix-ui/react-scroll-area';


export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh'
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',

  button: {
    height: '48px',
    width: '48px',

    borderRadius: '6px',
    border: 'none',

    backgroundColor: '$gray800',

    color: '#8D8D99',

    cursor: 'pointer',
  }
})

export const ButtonCartContainer = styled('div', {
  display: 'flex'
})

export const CartCount = styled('div', {
  width: '1.5rem',
  height: '1.5rem',

  marginLeft: '-0.7rem',
  marginTop: '-0.5rem',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  borderRadius: 100,
  backgroundColor: '$green500',

  color: '$white',
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 'bold',
})

export const DialogRoot = styled(Dialog.Root, {
})

export const Content = styled(Dialog.Content, {
  width: '100%',
  maxWidth: '30rem',
  height: '100vh',

  padding: '4.5rem 3rem 3rem 3rem',

  position: 'fixed',
  top: '0%',
  left: '75%',

  backgroundColor: '$gray800',

  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
})

export const Title = styled(Dialog.Title, {
  fontWeight: 'bold',
  fontSize: '1.25rem',
  lineHeight: '160%',
  color: '$gray100',
})

export const CloseButtom = styled(Dialog.Close, {
  position: 'absolute',
  right: '1.50rem',
  top: '3rem',

  background: 'transparent',
  border: '0',
  lineHeight: 0,
  cursor: 'pointer',
  color: '#8D8D99',
})

export const ItemsCart = styled(ScrollArea.Viewport, {
  height: '33rem',
})

export const BgImage = styled('div', {
  width: '6.25rem',
  height: '6.25rem',

  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const ProductItem = styled('div', {
  display: 'flex',
  gap: '1.25rem',

  paddingBottom: '1.5rem',
})

export const ProductItemInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '0.9rem',

  p: {
    color: '$gray300',
    fontSize: '1.125rem',
  },

  strong: {
    color: '#e1e1e6',
    fontSize: '1.125rem',
  },

  button: {
    background: 'transparent',

    color: '$green500',
    fontWeight: 'bold',
    fontSize: '1rem',
    textAlign: 'start',

    border: 'none',

    cursor: 'pointer',

    '&:hover': {
      color: '$green300',
    }
  }
})

export const TotalInfoCart = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '3.5625rem',

  button: {
    width: '24rem',
    height: '4.3125rem',
    borderRadius: 8,

    backgroundColor: '$green500',

    border: 'none',

    color: '$white',
    fontWeight: 'bold',
    fontSize: '1.125rem',
    fontFamily: 'Roboto, sans-serif',

    cursor: 'pointer',

    '&:hover': {
      backgroundColor: '$green300',
    },

    '&:disabled': {
      cursor: 'not-allowed',
      opacity: '50%',
    }
  }
})

export const InfoCart = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 7,

  div: {
    display: 'flex',
    justifyContent: 'space-between',

    p: {
      fontSize: '1rem',
      color: '#e1e1e6',
      lineHeight: '160%',
    },

    strong: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#e1e1e6',
      lineHeight: '140%',
    },
  }
})