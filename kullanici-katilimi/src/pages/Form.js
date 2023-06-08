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
        setKullaniciForm({
            isim: "",
            email: "",
            password: "",
            password_control: "",
            terms: false,
            kayit_tipi: ""
        });

    };

    const changeHandler = (e) => {
        const { value, name } = e.target;
        setKullaniciForm({...kullaniciForm,[name]: value});
        Yup.reach(formSchema, name)
            .validate(value)
            .then((valid) => {setFormErrors(({...formErrors,[name]: ""}));
            })
            .catch((err) => {console.log(err);setFormErrors({...formErrors,[name]: err.errors[0]
                });
            });

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
            .email("Gecerli bir e-mail adresi giriniz.")
            .required("E-mail adresi girmek zorunludur."),
        password: Yup
            .string()
            .min(6, "Sifre 6 haneden kisa olamaz.")
            .required("Sifre girmek zorunludur."),
        password_control: Yup
            .string()
            .oneOf([Yup.ref('password'), null])
            .required(),
        // Control validation bakilacak.
        terms: Yup
            .boolean()
            .oneOf([true], "Kullanici Kosullari kabul edilmek zorundadir."),
        kayit_tipi: Yup
            .string()
            .required("Kayit tipi secmek zorunludur.")
            .oneOf(["Yeni Uye", "Uyelik Yenileme"], "Lutfen secim yapiniz.")
    });


    useEffect(() => {
        console.log(formErrors)
        formSchema
            .isValid(kullaniciForm)
            .then((a) => {
                setValidButton(!a)
            });

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
                        data-cy="isim-input"
                    />
                    <FormFeedback>{formErrors.isim}</FormFeedback>
                </Label>
            </FormGroup>
            <FormGroup>
                <Label for="email">
                    E-mail giriniz.
                    <Input
                        id="email"
                        name="email"
                        placeholder="E-mail adresi giriniz."
                        type="email"
                        value={kullaniciForm.email}
                        onChange={changeHandler}
                        invalid={!!formErrors.email}
                        valid={!formErrors.email && kullaniciForm.email}
                        data-cy="email-input"
                    />
                    <FormFeedback>{formErrors.email}</FormFeedback>
                </Label>
            </FormGroup>
            <FormGroup>
                <Label for="password">
                    Sifre giriniz.
                    <Input
                        id="password"
                        name="password"
                        placeholder="Sifre giriniz."
                        type="password"
                        value={kullaniciForm.password}
                        onChange={changeHandler}
                        invalid={!!formErrors.password}
                        valid={!formErrors.password && kullaniciForm.password}
                        data-cy="password-input"
                    />
                    <FormFeedback>{formErrors.password}</FormFeedback>
                </Label>
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
                        data-cy="password_control-input"
                    />
                    <FormFeedback>{formErrors.password_control}</FormFeedback>
                </Label>
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
                        data-cy="terms-input"
                    />
                    <FormFeedback>{formErrors.terms}</FormFeedback>
                </Label>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="kayit_tipi">
                    <Input
                        id="kayit_tipi"
                        name="kayit_tipi"
                        type="select"
                        value={kullaniciForm.kayit_tipi}
                        onChange={changeHandler}
                        valid={!formErrors.kayit_tipi && kullaniciForm.kayit_tipi}
                        data-cy="kayit_tipi-input"
                    >
                        <option defaultValue hidden>
                            Kayit tipi seciniz.
                        </option>
                        <option disabled>
                            Kayit tipi seciniz.
                        </option>
                        <option value="Yeni Uye">
                            Yeni Uye
                        </option>
                        <option value="Uyelik Yenileme">
                            Uyelik Yenileme
                        </option>
                    </Input>
                    <FormFeedback>{formErrors.kayit_tipi}</FormFeedback>
                </Label>
            </FormGroup>
            <Button data-cy="submit-button" type="submit" disabled={validButton}>Ekle</Button>


        </Form>

    )
};

export default YeniKullaniciKarti;