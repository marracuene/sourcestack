import m from 'mithril';
import { bind } from '../uiutils';
import { Page } from './page';
import { AuthClient } from '../authclient';

export class ForgotPasswordPage {

    email: string = '';

    oncreate(){
        document.getElementById('email').focus();
    }

    view() {
        let complete = this.complete();
        return <Page hideNavbar={true}>
            <div class="flex justify-center">
                <div class="w-full max-w-md pt-8">
                    <h1 class="text-center text-2xl mb-4">Reset your password</h1>
                    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" {...bind(this)}>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="email" />
                            {AuthClient.user.loginError && <p class="text-red-500 text-xs italic">{AuthClient.user.loginError}</p>}
                        </div>
                        <div class="flex items-center justify-between mb-4">
                            <button disabled={!complete} 
                                class="disabled:opacity-50 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" 
                                type="button" onclick={() => this.resetpassword()}>
                                Reset
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </Page>
    }

    async resetpassword() {
        await AuthClient.forgotPassword(this.email);
        if (!AuthClient.user.loginError){
            m.route.set('/confirmforgotpassword');
        }
        else {
            m.redraw();
        }
    }

    complete() {
        return this.email !== '';
    }
}