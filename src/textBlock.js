import styles from './components/TextBlock.module.css';

function TextBlock() {
    return (
        <div className={styles.textblock}>
            <div className={styles.textblockContainer}>
                <h1 className={styles.textblockTitle}>Parallax with @react-spring/parallax</h1>
                <p className={styles.textblockContent}>
              
                React Spring is a spring-physics based animation library that gives all the necessary tools to make simple,<br/> yet powerful, animations and interactions via the different interpolations and transitions provided to us.
                <br/><br/>Why Springs?<br/><br/>
We think of animation in terms of time and curves, but that causes most of the struggle we face when trying to make elements on the screen move naturally, because nothing in the real world moves like that.<br/>

Springs don’t have a defined curve or a set duration.
                </p>
            </div>
        </div>
    );
}

export default TextBlock;