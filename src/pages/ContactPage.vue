<script>
export default {
    name: "contact"
}
</script>

<template>
    <div class="container d-flex align-items-center">
        <div class="row">
            <div class="col-7 mt-5 pt-5">
                <h1 class="fw-bold">Entra in contatto con DeliveBoo</h1>
                <p class="fw-bold">Hai una domanda, oppure hai bisogno di consigli o assistenza? Siamo qui per offrirti il
                    nostro supporto in diversi modi.</p>
            </div>
            <div class="col-5 mt-5">
                <div class="card shadow p-4">
                    <div class="card-body text-center p-4">
                        <h2 class="text-center fw-bold mb-4">Invia messaggio</h2>
                        <form action="" class="d-flex flex-column gap-2 mb-4">
                            <label for=""></label>
                            <input type="text" class="form-control" placeholder="Nome">
                            <label for=""></label>
                            <input type="text" class="form-control" placeholder="Email">
                            <label for=""></label>
                            <textarea name="" id="" cols="30" rows="4" class="form-control" placeholder="Messaggio"></textarea>
                        </form>
                        <p class="text-center">*Ci impegnamo a non divulgare le tue informazioni personali a terzi.</p>
                        <a href="#" class="btn fw-bold mt-3">Invia</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../styles/general.scss" as *;

.container {
    height: 100vh;

    h1 {
        font-size: 4.5rem;
        color: #F2C802;
    }

    p {
        font-size: 1.8rem;
        color: #03071E;
    }

    .col-5 {
        .card {
            border: none;
            border-radius: 5px;

            .card-body {
                border: 1px dashed #F2C802;
                border-radius: 5px;

                h2 {
                    font-size: 1.8rem;
                    color: #03071E;
                }

                input,
                textarea {
                    border: none;
                    border-radius: 5px;
                    background-color: #F9FAFC;
                    padding: 10px;
                }

                .form-control:focus {
                    border: 2px solid #F2C802;
                    border-color: #F2C802;
                    box-shadow: none;
                    color: #03071E;
                }

                p {
                    color: #03071E;
                    font-size: 0.9rem;
                    width: 70%;
                    margin: 0 auto;
                }

                .btn {
                    background-color: #F2C802;
                    color: #03071E;
                    border-radius: 10px;
                    padding: 5px 15px;
                    font-size: 1.2rem;

                    &:hover {
                        background-color: #FAA307;
                    }
                }
            }
        }
    }
}
</style>