import React from 'react';
import styles from './BlobButton.module.css';

export default function BlobButton({ children, onClick, className = '' }) {
  return (
    <>
      <svg className={styles.blobSvg} xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="blobGoo">
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
        type="button"
        className={`${styles.blobBtn} ${className}`}
        onClick={onClick}
      >
        {children}
        <span className={styles.blobBtnInner}>
          <span className={styles.blobBtnBlobs}>
            <span className={styles.blobBtnBlob}></span>
            <span className={styles.blobBtnBlob}></span>
            <span className={styles.blobBtnBlob}></span>
            <span className={styles.blobBtnBlob}></span>
          </span>
        </span>
      </button>
    </>
  );
}
