import {computed} from "vue";

export function useSignUpValidate(username, password, rPassword, agreed) {
    const isUsernameValid = computed(() => {
        const value = username.value;
        // presence check
        const presenceRegex = /^.+$/;
        if (!presenceRegex.test(value))
            return "Username can't be empty.";

        // special characters check
        const charCheck = /^[A-Za-z0-9_]+$/;
        if (!charCheck.test(value))
            return "Username should only consist of latin letters, numbers and underscores.";

        // range check
        if (value.length < 3) return "Username is too short.";
        else if (value.length > 30) return "Username is too long.";
    });

    const isPasswordValid = computed(() => {
        const value = password.value;
        // presence check
        const presenceRegex = /^.+$/;
        if (!presenceRegex.test(value))
            return "Password can't be empty.";

        // range check
        if (value.length < 6)
            return "Password is too short.";
    });

    const isRepeatPassValid = computed(() => {
        // similarity check
        if (rPassword.value !== password.value)
            return "Passwords are not similar";
    });

    const hasAgreed =
        computed(() => !agreed.value ? "You have to agree with the ToS." : "");

    return {
        isUsernameValid,
        isPasswordValid,
        isRepeatPassValid,
        hasAgreed
    }
}