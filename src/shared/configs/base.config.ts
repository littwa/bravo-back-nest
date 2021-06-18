export default () => ({
    nodemailerTransporterConfig: {
        transport: {
            host: 'smtp.gmail.com',
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        },
        defaults: {
            from: '"No Reply" <noreply@example.com>',
        },
    }
});



