import { styled } from "..";

export const SuccesContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300'
    }

  }
})

export const ImagesContainer = styled('div', {
  minWidth: 130,
  maxWidth: 1120,
  width: '100%',

  margin: '0 auto',
  paddingLeft: '3rem',
  marginBottom: '3rem',

  display: 'flex',
  justifyContent: 'center',
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 130,
  height: 130,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 100,
  boxShadow: '0px 0px 60px 0px rgba(0, 0, 0, 0.80)',

  padding: '0.25rem',
  marginTop: '4rem',
  marginLeft: '-3rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  }
})