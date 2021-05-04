import styles from './styles.module.scss'
import format from 'date-fns/format'
import enUS from 'date-fns/locale/en-US'

function Header(){

    const currentDate = format(new Date(), 'EEEEE, d MMM', {
        locale: enUS
    });

    return (
        <header className={styles.HeaderContainer}>
            <img src="/logo.svg" alt="Logo"/>

            <p className={styles.TextHeader}>
                Project created by Igor for training React
            </p>

            <span className={styles.Date}>
                {currentDate}
            </span>
        </header>
    )
}

export default Header;