import { Link } from 'react-router-dom';
import React from 'react';
import styles from './index.module.scss';
import '../assets/common.scss';


/**
 * 布局组件
 *
 * @export
 * @class Layout
 * @extends {React.PureComponent}
 */
export class Layout extends React.PureComponent {

    render(): JSX.Element {
        return (
            <div className="normal">
                <h1 className={styles.title}>
                    <Link to='/'>Egg + React + SSR</Link>
                    <div className={styles.author}>by ykfe</div>
                </h1>
                {this.props.children}
            </div>
        )
    }
}