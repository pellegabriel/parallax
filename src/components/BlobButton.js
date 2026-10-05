import React, { forwardRef, useId } from 'react';
import styles from './BlobButton.module.css';

const BlobButton = forwardRef(function BlobButton({ children, onClick, className = '', ...props }, ref) {
  const filterId = `blob-${useId().replace(/:/g, '')}`;
  return (
    <>
      <svg className={styles.blobSvg} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
              result="goo"
            />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>

      <button
        {...props}
        ref={ref}
        type="button"
        className={`${styles.blobBtn} ${className}`}
        onClick={onClick}
      >
        {children}
        <span className={styles.blobBtnInner} aria-hidden="true">
          <span className={styles.blobBtnBlobs} style={{ filter: `url(#${filterId})` }}>
            <span className={styles.blobBtnBlob}></span>
            <span className={styles.blobBtnBlob}></span>
            <span className={styles.blobBtnBlob}></span>
            <span className={styles.blobBtnBlob}></span>
          </span>
        </span>
      </button>
    </>
  );
});

export default BlobButton;
