<script>
export default {
    name: "about"
}
</script>

<template>
    <div id="hero" class="d-flex align-items-center justify-content-center">
        <div class="container">
            <div class="row">
                <div class="col-5 mt-5">
                    <h1 class="fw-bold">Chi siamo?</h1>
                    <p class="fw-bold">DeliveBoo è uno dei principali mercati globali di consegna di cibo online, che mette
                        in contatto i
                        consumatori con oltre un milione di partner in 20 paesi.</p>
                </div>
            </div>
        </div>
    </div>

    <div class="section-1 my-5">
        <div class="container py-5">
            <div class="row">
                <div class="col-5">
                    <!-- IMG BACKGROUND -->
                </div>
                <div class="col-7 ps-5">
                    <h2 class="fw-bold mb-3">Perchè DeliveBoo...</h2>
                    <p>Immagina di essere appena tornato a casa <strong>stanco dal lavoro</strong> e desideroso di
                        <strong>rilassarti</strong> godendoti il
                        tuo <strong>piatto preferito</strong>,
                        magari in buona compagnia. Apri il frigo ed è <strong>vuoto</strong>, sono le nove di sera
                        e i supermercati sono chiusi oppure lontani da casa...
                    </p>
                    <p>
                        Quante volte ci è successo di rimanere a casa senza nulla da mangiare? Dal 2015 non accade più!
                        DeliveBoo è <strong>facile</strong>, <strong>comodo</strong>, <strong>veloce</strong> e
                        <strong>conveniente</strong>: non abbiamo intermediari, instauriamo rapporti
                        esclusivi con i produttori consegnando da loro direttamente a casa tua… <strong>così
                            risparmi</strong>.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <hr>
    </div>

    <div class="section-2 my-5">
        <div class="container py-5">
            <div class="row">
                <div class="col-7">
                    <h2 class="fw-bold mb-3">
                        DeliveBoo: l'Esperienza!
                    </h2>
                    <p>
                        DeliveBoo è l'app per mangiare! Servizio di <strong>consegna a domicilio</strong> di <strong>cibo e
                            bevande</strong>
                        specializzato nella consegna <strong>express</strong>: i nostri ordini vengono consegnati in meno di
                        <strong>30 min</strong>!
                        L’idea nasce nel 2015 quando i <strong>Fondatori</strong>, <strong>Marco Mazzotti</strong>,
                        <strong>Giuseppe Donnici</strong>, <strong>Filippo Foti</strong>, <strong>Silvano Gül</strong> e
                        <strong>Giueppe Repici</strong>
                        si sono accorti che a Milano, e in <strong>Italia</strong> in generale, non c’era la possibilità di
                        <strong>ordinare</strong> da casa bel <strong>buon cibo</strong> e riceverlo in <strong>poco
                            tempo</strong>.
                        Così decidono di offrire, prima ai milanesi e
                        poi al resto del Bel Paese, un servizio innovativo con l’obiettivo di rendere sempre più accessibili
                        i fantastici piatti delle migliori cucine Italiane e non, valorizzando anche i <strong>piccoli
                            produttori</strong>.
                    </p>
                </div>
                <div class="col-5">
                    <!-- IMG BACKGROUND -->
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <hr>
    </div>

    <div class="section-3 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-5">
                    <figure class="w-100 h-100 text-center m-0">
                        <img src="../assets/img/section3-about.png" alt="" class="pb-5">
                    </figure>
                </div>
                <div class="col-7 pt-5">
                    <h2 class="fw-bold mt-5 mb-3">
                        Ce n'è per tutti i gusti.
                    </h2>
                    <p>
                        La nostra <strong>missione</strong> è quella di rendere le nostre <strong>città</strong> dei
                        <strong>grandi ristoranti</strong>, dando la possibilità a
                        tutti gli amanti del <strong>“mangiare bene”</strong> di non rinunciare più ad una buona
                        <strong>scorpacciata</strong>! I clienti di
                        DeliveBoo
                        sono infatti amanti del <strong>cibo</strong> di <strong>qualità</strong> che vogliono godersi un
                        buon pasto senza dover spendere
                        del <strong>tempo prezioso</strong> per raggiungere il ristorante più vicino, con il rischio di non
                        trovare il
                        prodotto
                        ricercato.
                    </p>
                    <p>
                        A loro dedichiamo un’offerta accuratamente selezionata dal nostro <strong>team</strong> di
                        <strong>esperti culinari</strong> che lavora
                        quotidianamente per <strong>garantire</strong> l'<strong>alta qualità</strong> del prodotto al
                        <strong>giusto prezzo</strong>.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <hr>
    </div>

    <div class="section-4 my-5">
        <div class="container py-5">
            <div class="row">
                <div class="col-7 d-flex justify-content-center flex-column">
                    <h2 class="fw-bold mb-3">
                        DeliveBoo il sito e l'app...
                    </h2>
                    <p>
                        Come abbiamo fatto a <strong>trasformare</strong> le nostre <strong>città</strong> in <strong>ristoranti</strong>? Semplice, mettendovi in mano tutti i
                        <strong>menù</strong>!
                        Fin dalla sua nascita DeliveBoo ha puntato tutto sul <strong>mobile</strong> creando un’<strong>app</strong> e un
                        <strong>sito mobile friendly</strong> così che chiunque avesse un cellulare potesse scegliere il suo piatto
                        preferito, comprarlo ed averlo a casa in <strong>meno di 30 minuti senza nemmeno doversi alzare dal divano!</strong>
                    </p>
                </div>
                <div class="col-5 text-center">
                    <img src="../assets/img/cellulare.png" alt="" class="w-50">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../styles/general.scss" as *;

#hero {
    width: 100%;
    height: 100vh;
    background-image: url('../assets/img/hero-about.jpg');
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;

    h1 {
        font-size: 4.5rem;
        color: #F2C802;
    }

    p {
        font-size: 1.8rem;
        color: #03071E;
    }
}

.section-1,
.section-2,
.section-3,
.section-4 {

    h2 {
        font-size: 2.5rem;
        color: #F2C802;
    }

    p {
        font-size: 1.1rem;
        color: #03071E;
    }
}

hr {
    border: 1px solid #DC2F02;
}

.section-1 {
    .col-5 {
        background-image: url('../assets/img/section1-about.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 50px;
    }
}

.section-2 {
    .col-5 {
        background-image: url('../assets/img/section2-about.png');
        background-size: cover;
        background-repeat: no-repeat;
    }
}

.section-3 {
    .col-5 {

        // background-image: url('../assets/img/section3-about.png');
        // background-size: contain;
        // background-repeat: no-repeat;
        // background-position: center;
        img {
            width: 65%;
            height: 100%;
            object-fit: cover;
        }
    }
}


</style>