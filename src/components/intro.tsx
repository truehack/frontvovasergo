import { IonContent, IonHeader, IonPage, IonTextarea, IonTitle, IonToolbar, IonText,IonButton } from '@ionic/react';
import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide,useSwiper } from 'swiper/react';
import Intro1Svg from '../assets/intro/1.svg';
import Intro2Svg from '../assets/intro/2.svg';
import Intro3Svg from '../assets/intro/3.svg';
import Intro4Svg from '../assets/intro/4.svg';
import './intro.css';


interface ContainerProps {
    onFinish: () => void;

}

const SwiperButtonNext = ({ children }: any) => {
    const swiper = useSwiper();
    return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>;

};

const Intro: React.FC<ContainerProps> = ({ onFinish }) => {

    return (
        <Swiper>
            <SwiperSlide>
                <img src={Intro3Svg} alt="Intro3" />
                <IonText>
                    <h3>Следуй предписаниям своих врачей</h3>
                </IonText>
                <SwiperButtonNext>Далее</SwiperButtonNext>
            </SwiperSlide>

            <SwiperSlide>
                <img src={Intro2Svg} alt="Intro2" />
                <IonText>
                    <h3>Следи за своим здоровьем и здоровьем своих близких</h3>
                </IonText>
                <SwiperButtonNext>Далее</SwiperButtonNext>
            </SwiperSlide>

            <SwiperSlide>
                <img src={Intro1Svg} alt="Intro1" />
                <IonText>
                    <h3>Принимай таблетки вовремя</h3>
                </IonText>
                <IonButton onClick={() => onFinish()}>Готово</IonButton>
            </SwiperSlide>
        </Swiper>
    );
};

export default Intro;