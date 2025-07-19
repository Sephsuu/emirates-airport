import React from 'react';
import styled from 'styled-components';

export const Loader = () => {
  return (
    <section className='w-full relative'>
      <StyledWrapper className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
        <div className="loader" />
        <div className='animate-bounce text-xl font-emirates-bold'>Loading</div>
      </StyledWrapper>
    </section>
  );
}

const StyledWrapper = styled.div`
  .loader {
    width: 4rem;
    height: 4rem;
    clear: both;
    margin: 1rem auto;
    border: 2px #8E1616 solid;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
  }

  .loader:after,
  .loader:before {
    content: "";
    border-radius: 50%;
    position: absolute;
    width: inherit;
    height: inherit;
    animation: spVortex 2s infinite linear;
  }

  .loader:before {
    border-top: 0.5rem #8E1616 solid;
    top: -0.1875rem;
    left: calc(-50% - 0.1875rem);
    transform-origin: right center;
  }

  .loader:after {
    border-bottom: 0.5rem #8E1616 solid;
    top: 0.1875rem;
    right: calc(-50% - 0.1875rem);
    transform-origin: left center;
  }

  @keyframes spVortex {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(359deg);
    }
  }`;

export default Loader;
