import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Button, FormGroup, Form, Label, Input, FormFeedback } from 'reactstrap';


const YeniKullaniciKarti = ({ kullaniciEkle }) => {

    const [kullaniciForm, setKullaniciForm] = useState(
        {
            isim: "",
            email: "",
            password: "",
            password_control: "",
            terms: false,
            kayit_tipi: ""
        }
    );
    const [formErrors, setFormErrors] = useState(
        {
            isim: "",
            email: "",
            password: "",
            password_control: "",
            terms: false,
            kayit_tipi: ""
        }
    );

    const [validButton, setValidButton] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        kullaniciEkle(kullaniciForm)
        console.log(kullaniciForm)
    };

    const changeHandler = (e) => {
        const { value, name } = e.target;
        Yup.reach(formSchema, name)
            .validate(value)
            .then(() => {
                setFormErrors((prevFormErrors) => ({
                    ...prevFormErrors,
                    [name]: ""
                }));
            })
            .catch((err) => {
                console.log(err);
                setFormErrors((prevFormErrors) => ({
                    ...prevFormErrors,
                    [name]: err.errors[0]
                }));
            });
        
        setKullaniciForm((prevKullaniciForm) => ({
            ...prevKullaniciForm,
            [name]: value
        }));
    };
    
    

    const changeCheckHandler = (e) => {
        const { value, name, checked } = e.target;
        setKullaniciForm({ ...kullaniciForm, [name]: checked })
    };

    const formSchema = Yup.object().shape({
        isim: Yup
            .string()
            .matches(/^[A-Za-z]+\s[A-Za-z]+$/, "Isim ve Soyisim arada bosluk birakilarak yazilmali.")
            .required("Isim Soyisim girmek zorunludur."),
        email: Yup
            .string()
            .email()
            .required("E-mail adresi girmek zorunludur."),
        password: Yup
            .string()
            .min(6, "Sifre 6 haneden kisa olamaz.")
            .required("Sifre girmek zorunludur."),
        password_control: Yup
            .string()
            .required()
            .oneOf([Yup.ref('password'), ""], "Sifre Sifreler eslesmiyor."),


        // Control validation bakilacak.
        terms: Yup
            .boolean()
            .oneOf([true], "Kullanici Kosullari kabul edilmek zorundadir."),
        kayit_tipi: Yup
            .string()
            .required("Kayit tipi secmek zorunludur.")
    });


    useEffect(() => {
        formSchema
            .isValid(kullaniciForm)
            .then(a => setValidButton(!a));

    }, [kullaniciForm])

    return (
        <Form onSubmit={submitHandler}>
            <FormGroup>
                <Label for="isim">
                    Isim Soyisim giriniz.
                    <br />
                    <span style={{ "color": "red", "fontSize": "smaller" }}>(Aralarinda bosluk birakiniz.)</span>
                    <Input
                        id="isim"
                        name="isim"
                        placeholder="Kullanici adi giriniz."
                        type="text"
                        value={kullaniciForm.isim}
                        onChange={changeHandler}
                        invalid={!!formErrors.isim}
                        valid={!formErrors.isim && kullaniciForm.isim}
                    />
                </Label>
                <FormFeedback>{formErrors.isim}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="email">
                    E-mail giriniz.
                    <Input
                        id="email"
                        name="email"
                        placeholder="E-mail adi giriniz."
                        type="email"
                        value={kullaniciForm.email}
                        onChange={changeHandler}
                        invalid={!!formErrors.email}
                        valid={!formErrors.email && kullaniciForm.email}
                    />
                </Label>
                <FormFeedback>{formErrors.email}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="password">
                    Sifre giriniz.
                    <Input
                        id="password"
                        name="password"
                        placeholder="Sifre adi giriniz."
                        type="password"
                        value={kullaniciForm.password}
                        onChange={changeHandler}
                        invalid={!!formErrors.password}
                        valid={!formErrors.password && kullaniciForm.password}
                    />
                </Label>
                <FormFeedback>{formErrors.password}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="password_control">
                    Sifrenizi tekrar giriniz.
                    <Input
                        id="password_control"
                        name="password_control"
                        placeholder="Sifrenizi tekrar giriniz."
                        type="password"
                        onChange={changeHandler}
                        value={kullaniciForm.password_control}
                        invalid={!!formErrors.password_control}
                        valid={!formErrors.password_control && kullaniciForm.password_control}
                    />
                </Label>
                <FormFeedback>{formErrors.password_control}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="terms">
                    Kullanim Sartlarini kabul etmelisiniz.
                    <Input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        onChange={changeCheckHandler}
                        checked={kullaniciForm.terms}
                        invalid={formErrors.terms}
                        valid={!formErrors.terms}
                    />
                </Label>
                <FormFeedback>{formErrors.terms}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="kayit_tipi">
                    <Input
                        id="kayit_tipi"
                        name="kayit_tipi"
                        type="select"
                        value={kullaniciForm.kayit_tipi}
                        onChange={changeHandler}
                        invalid={!!formErrors.kayit_tipi}
                        valid={!formErrors.kayit_tipi && kullaniciForm.kayit_tipi}
                    >
                        <option defaultValue hidden>
                            Kayit tipi seciniz.
                        </option>
                        <option disabled>
                            Kayit tipi seciniz.
                        </option>
                        <option>
                            Yeni Uye
                        </option>
                        <option>
                            Uyelik Yenileme
                        </option>
                    </Input>
                </Label>
                <FormFeedback>{formErrors.kayit_tipi}</FormFeedback>
            </FormGroup>
            <Button type="submit" disabled={validButton}>Ekle</Button>


        </Form>

    )
};

export default YeniKullaniciKarti;