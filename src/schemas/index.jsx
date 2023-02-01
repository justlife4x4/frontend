import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const loginPasswordSchema = Yup.object({
    keyInputUser: Yup.string().required("Mobile no./ Email can't be empty!").min(10, "Invalid user!"),
    keyInputPassword: Yup.string().required("Password can't be empty!").min(4, "Invalid password!")
});

export const loginOtpSchema = Yup.object({
    keyInputUser: Yup.string().required("Mobile no./ Email can't be empty!").min(10, "Invalid user!"),
    keyInputOtp: Yup.string().required("OTP can't be empty!").min(6, "Invalid otp!")
});

export const forgetPasswordSchema = Yup.object({
    keyInputUser: Yup.string().required("Mobile no./ Email can't be empty!").min(10, "Invalid user!"),
});

export const changePasswordSchema = Yup.object({
    //keyInputOldPassword: Yup.string().required("Old password can't be empty!").min(4, "Invalid old password!"),
    keyInputNewPassword: Yup.string().required("New password can't be empty!").min(4, "Invalid new password!"),
    keyInputReEnterNewPassword: Yup.string().required("Re enter new password can't be empty!").min(4, "Invalid re enter new password!")
        .test({
            params: { },
            message: 'Invalid new password & re enter new password!',
            test: function (value) {
                return value === this.parent.keyInputNewPassword
            }
        })
});

export const accessLevelSchema = Yup.object({
    keyInputName: Yup.string().required("Name can't be empty!").min(3, "Invalid name!"),
    keyInputDescription: Yup.string().required("Description can't be empty!").min(10, "Invalid description!")
});

export const idDocumentSchema = Yup.object({
    keyInputName: Yup.string().required("Name can't be empty!").min(3, "Invalid name!"),
    keyInputDescription: Yup.string().required("Description can't be empty!").min(10, "Invalid description!")
});

export const bookingAgentSchema = Yup.object({
    keyInputName: Yup.string().required("Name can't be empty!").min(3, "Invalid name!"),
    keyInputDescription: Yup.string().required("Description can't be empty!").min(10, "Invalid description!")
});

export const employeeSchema = Yup.object({
    keyInputAccessLevels: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        name: Yup.string(),
      })
    )
    .required("Access level can't be empty!"),
    keyInputName: Yup.string().required("Name can't be empty!").min(6, "Invalid name!"),
    keyInputAddress: Yup.string().required("Address can't be empty!").min(3, "Invalid address!"),
    keyInputMobile: Yup.string().required("Mobile can't be empty!").matches(phoneRegExp, "Invalid mobile no!"),
    keyInputEmail: Yup.string().required("Email can't be empty!").email("Invalid email!")
});

export const planSchema = Yup.object({
    keyInputName: Yup.string().required("Name can't be empty!").min(6, "Invalid name!"),
    keyInputDescription: Yup.string().required("Description can't be empty!").min(10, "Invalid description!")
});

export const roomCategorySchema = Yup.object({
    keyInputName: Yup.string().required("Name can't be empty!").min(5, "Invalid name!"),
    keyInputTariff: Yup.number().required("Tariff can't be empty!").positive("Invalid tariff!").min(3, "Invalid tariff!"),
    keyInputDiscount: Yup.number().required("Maximum Discount can't be empty!").min(0, "Invalid maximum discount!")
        .test({
            name: 'max',
            exclusive: false,
            params: { },
            message: 'Invalid maximum discount!',
            test: function (value) {
                return value <= parseFloat(this.parent.keyInputTariff)
            }
        }),
    keyInputBed: Yup.number().required("Extra bed tariff can't be empty!").min(0, "Invalid extra bed tariff!")
        .test({
            name: 'max',
            exclusive: false,
            params: { },
            message: 'Invalid extra bed tariff!',
            test: function (value) {
                return value <= parseFloat(this.parent.keyInputTariff)
            }
        }),
    keyInputPerson: Yup.number().required("Extra person tariff can't be empty!").min(0, "Invalid extra person tariff!")
        .test({
            name: 'max',
            exclusive: false,
            params: { },
            message: 'Invalid extra person tariff!',
            test: function (value) {
                return value <= parseFloat(this.parent.keyInputTariff)
            }
        })
});

export const roomSchema = Yup.object({
    keyInputCategoryId: Yup.string().required("Category can't be empty!").min(1, "Invalid category!"),
    keyInputNo: Yup.string().required("No can't be empty!").min(1, "Invalid no!"),
    keyInputTariff: Yup.number().required("Tariff can't be empty!").positive("Invalid tariff!").min(3, "Invalid tariff!"),
    keyInputDiscount: Yup.number().required("Maximum discount can't be empty!").min(0, "Invalid maximum discount!")
        .test({
            name: 'max',
            exclusive: false,
            params: { },
            message: 'Invalid maximum discount!',
            test: function (value) {
                return value <= parseFloat(this.parent.keyInputTariff)
            }
        }),
    keyInputBed: Yup.number().required("Extra bed tariff can't be empty!").min(0, "Invalid extra bed tariff!")
        .test({
            name: 'max',
            exclusive: false,
            params: { },
            message: 'Invalid extra bed tariff!',
            test: function (value) {
                return value <= parseFloat(this.parent.keyInputTariff)
            }
        }),
    keyInputPerson: Yup.number().required("Extra person tariff can't be empty!").min(0, "Invalid extra person tariff!")
        .test({
            name: 'max',
            exclusive: false,
            params: { },
            message: 'Invalid extra person tariff!',
            test: function (value) {
                return value <= parseFloat(this.parent.keyInputTariff)
            }
        })
});

