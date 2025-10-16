import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonInput, IonButton, IonIcon, IonButtons, IonBackButton, useIonRouter} from '@ionic/react';
import { checkmarkDoneOutline, logInOutline, personRemoveOutline } from 'ionicons/icons';
import React from 'react';

const Register: React.FC = () => {
    const router = useIonRouter();


    const doRegister = (event: any) => {
        event.preventDefault();
        console.log('doRegister');
        router.goBack();
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'primary'}>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Create Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            
            <IonContent scrollY={false}>
                
                <IonCard>
                    <IonCardContent>
                        <form onSubmit={doRegister}>
                            <IonInput fill="outline" labelPlacement="floating" label="email" type='email' placeholder='mai@gmail.com'></IonInput>
                            <IonInput className="ion-margin-top" fill="outline" labelPlacement="floating" label="Password" type='password' placeholder='12345678'></IonInput>
                            <IonButton color={'secondary'} type="submit" expand="block" className="ion-margin-top">
                                Create account
                                <IonIcon icon={checkmarkDoneOutline} slot="end" />
                            </IonButton>
                        </form>
                    </IonCardContent>
                </IonCard>    
            </IonContent>
            
        </IonPage>
    );
};

export default Register;