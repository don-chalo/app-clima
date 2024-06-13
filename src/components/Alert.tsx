import { ReactNode } from 'react';

import style from './Alert.module.css';

function Alert({ children }: { children: ReactNode }) {
    return (
        <div className={style.alert}>{children}</div>
    );
}

export default Alert;