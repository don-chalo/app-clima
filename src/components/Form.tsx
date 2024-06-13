import { ChangeEvent, FormEvent, useState } from 'react';

import style from './Form.module.css';
import { countries } from '../data';
import { SearchType } from '../types';
import Alert from './Alert';

type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>
}

function Form({ fetchWeather }: FormProps) {

    const [search, setSearch] = useState<SearchType>({ city: '', country: '' });
    const [alert, setAlert] = useState('');

    const handleChange= (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(search).includes('')) {
            setAlert('Por favor, rellena todos los campos');
            return;
        }
        fetchWeather(search);
    }

    return (
        <form className={style.form} onSubmit={handleSubmit}>
            {
                alert && <Alert>{alert}</Alert>
            }
            <div className={style.field}>
                <label htmlFor="city"></label>
                <input id="city" name="city" placeholder="Ciudad" type="text" value={search.city} onChange={handleChange} />
            </div>
            <div className={style.field}>
                <label htmlFor="country">Pais:</label>
                <select id="country" name="country" value={search.country} onChange={handleChange}>
                    <option value="">-- Selecciona un pa&iacute;s</option>
                    {
                        countries.map(({ code, name }) => (
                            <option key={code} value={code}>{name}</option>
                        ))
                    }
                </select>
            </div>
            <input className={style.submit} type="submit" value="Consultar clima" />
        </form>
    );
}

export default Form;
