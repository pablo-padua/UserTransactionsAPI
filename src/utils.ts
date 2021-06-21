import bcrypt from 'bcrypt';

export function isOverEighteen(birthDate: Date) {
    var date = new Date(birthDate);
    return age(date);
}

function age(birth: Date): boolean {
    var today = new Date();
    var birthDate = new Date(birth);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18;
}

export const salt = bcrypt.genSaltSync(10);
export const validEmail: RegExp = /^[^\s@]+@[^\s@]+.[A-Za-z]+$/;
export const validPassword: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;