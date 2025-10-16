import { IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonIcon, useIonRouter, useIonLoading, IonGrid,IonRow, IonCol } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { logInOutline, personCircleOutline } from 'ionicons/icons';
import FCC from '../assets/fcc.svg';
import Intro from '../components/intro'
import { Preferences } from '@capacitor/preferences';

const INTRO_KEY = 'intro-seen';


const Login: React.FC = () => {
    const router = useIonRouter();
    const [introSeen, setIntroSeen] = useState(true);
    const [present,dismiss] = useIonLoading();

    useEffect(() => {
        const checkStorage = async () => {
            const seen = await Preferences.get({ key: INTRO_KEY });
        }

    },[])
    const doLogin = async (event: any) => {
        event.preventDefault();
        await present('Подождите...');
        setTimeout(async () => {
            dismiss();
            router.push('/app', 'root');
        }, 2000);

        
    };

    const finishIntro = async() => {
        console.log('FIN');
        setIntroSeen(true);
    }

    const seeIntroAgain = () => {
        setIntroSeen(false);
        Preferences.remove({ key: INTRO_KEY});
    };

    return (
        <>
        {!introSeen ? (
            <Intro onFinish={finishIntro}/>
        ) : (
            <IonPage>
                <IonHeader>
                    <IonToolbar color={'primary'}>
                        <IonTitle>Умный лекарь</IonTitle>
                    </IonToolbar>
                </IonHeader>
            
                <IonContent scrollY={false} className="ion-padding">
                    <IonGrid fixed>
                        <IonRow class="ion-justify-content-center">
                            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                                <div className="ion-text-center ion-padding">
                                    <img src={FCC} alt="FCC Logo" width={'50%'}/>
                                </div>
                            </IonCol>

                        <IonRow class="ion-justify-content-center">
                            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                                <IonCard>
                        <IonCardContent>
                            <form onSubmit={doLogin}>
                                <IonInput fill="outline" labelPlacement="floating" label="Имя" type='email' placeholder='Иван'></IonInput>
                                <IonInput className="ion-margin-top" fill="outline" labelPlacement="floating" label="Фамилия(необязательно)" type='password' placeholder='Иванов'></IonInput>
                                {/* <IonButton color={'secondary'} type="submit" expand="block" className="ion-margin-top">
                                    Login
                                    <IonIcon icon={logInOutline} slot="end" />
                                </IonButton> */}

                                <IonButton routerLink="/Register" color={'success'} type="button" expand="block" className="ion-margin-top">
                                Начать
                                <IonIcon icon={personCircleOutline} slot="end" />
                                </IonButton>

                                <IonButton onClick={seeIntroAgain} fill="clear" size='small' color={'dark'} type="button" expand="block" className="ion-margin-top">
                                Вернуться
                                <IonIcon icon={personCircleOutline} slot="end" />
                                </IonButton>
                            </form>
                        </IonCardContent>
                    </IonCard> 

                            </IonCol>
                            </IonRow>
                        </IonRow>
                    </IonGrid>
                    
                       
                </IonContent>
            
            </IonPage>
        )}
        </>
    );
};

export default Login;
