{{! © 2017 NetSuite Inc. User may not copy, modify, distribute, or re-bundle or otherwise make available this code; provided,
however, if you are an authorized user with a NetSuite account or log-in, you may use this code subject to the terms that
govern your access and use. }}

<!--CONTACT US  -->
<section class='theme-landing-page' id='theme-contact-us'>

    <div class="row contact-us-content" data-cms-area="contact_full-banner-2" data-cms-area-filters="path"></div>

    <div class="contact-us-form">

        <div class="contact-us-form-content">
            <div class='container'>

                <div class='row'>
                    <div class='col-md-12'>

                        <!-- intro -->
                        <h1>Contact Us</h1>
                        <p>You can also call us toll free in North America at 1-877-570-0979 or our regular phone number is
                            1-905-570-0979. Our phones are staffed from 9 AM to 5 PM Eastern Time, Monday to Friday.</p>
                        <!-- /.intro -->

                        <!-- contact block -->
                        <p>
                            <span>
                                <b>Our address:</b>
                            </span>
                            <br>
                            <span>120 Lancing Drive, Unit 8</span>
                            <br>
                            <span>Hamilton, Ontario</span>
                            <br>
                            <span>L8W 3A1</span>
                            <br>
                            <span>Canada</span>
                        </p>
                        <!-- /.contact block -->

                        <!-- google map -->
                        <div class="iframe">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.877836897778!2d-79.84319868451718!3d43.19107407913986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c9a0f570d6bff%3A0x3016a75cbfc4e32f!2sthetubestore.com!5e0!3m2!1sen!2sca!4v1451493846590"
                                width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
                        </div>
                        <!-- /.google map -->

                        <!-- content -->
                        <p>There are many common questions that you can easily find answers to on our website. So before you
                            email, please check our site for answers first - you'll find it's very simple.</p>
                        <h2>Do you have a problem with an order you received?</h2>
                        <p>You can contact us by filling out the form at the bottom of this page. Be sure to include your order
                            number! If you prefer to call you can do so.</p>
                        <h2>How much does shipping cost and how do I pay?</h2>
                        <p>Check out our
                            <a href="/Resources/Customer-Service-Info/Shipping-Options">Shipping Options</a> page for these answers and more.</p>
                        <h2>Do we have a printed catalog?</h2>
                        <p>No, but our site is updated daily and includes the most up-to-date info on our products that we have.</p>
                        <h2>If you are looking for a certain tube type,</h2>
                        <p>Search our site first. Enter the term into the Search field at the top right of any page. If nothing
                            is found, try some variations on your search terms. If still nothing is found, we probably have
                            not got the item in stock.</p>
                        <h2>Is a certain type in stock?</h2>
                        <p>Every product on our site has an Availability section that is constantly updated with our current
                            inventory information.</p>
                        <h2>Questions about your amp or tubes in general?</h2>
                        <p>We've got a lot of answers on our
                            <a href="/Resources">Resources pages</a>.</p>
                        <h2>Do we have Telefunken, Mullard, Siemens...</h2>
                        <p>Search our site. These brands are rare but when we do get them they are put on our site immediately.</p>
                        <h2>If you have a question about your order,</h2>
                        <p>make sure to include the order number in your message. If our site does not answer your question,
                            or you have an inquiry about an order you have placed, then submit the form below.</p>
                        <!-- /.content -->

                    </div>
                </div>


                <div class='row'>
                    <div class='col-md-12'>

                        <form id="contact-us-form" class="contact-us-form-new" action="POST">

                            <div class='container'>
                                <div class='row'>
                                    <div class='col-md-12'>
                                        <div data-type="alert-placeholder"></div>
                                        <div class='contact-us-form-box'>
                                            <!--<label class="contact-us-form-content-label-required">
                                                {{translate 'Required'}} <span class="contact-us-form-content-required">*</span> 
                                            </label>-->
                                            <div data-validation="control-group" data-input="firstname">
                                                <div class="contact-us-form-controls" data-validation="control">
                                                    <input type='text' placeholder='First Name' id="firstname" name='firstname' value="{{firstname}}">
                                                </div>
                                            </div>
                                            <div data-validation="control-group" data-input="lastname">
                                                <div class="contact-us-form-controls" data-validation="control">
                                                    <input type='text' placeholder='Last Name' id="lastname" name='lastname' value="{{lastname}}">
                                                </div>
                                            </div>
                                            <div data-validation="control-group" data-input="company">
                                                <div class="contact-us-form-controls" data-validation="control">
                                                    <input type='text' placeholder='Company Name' id="company" name='company' value="{{company}}">
                                                </div>
                                            </div>
                                            <div data-validation="control-group" data-input="email">
                                                <div class="contact-us-form-controls" data-validation="control">
                                                    <input type='text' placeholder='Email' id="email" name='email' value="{{email}}">
                                                </div>
                                            </div>
                                            <div data-validation="control-group" data-input="message">
                                                <div class="contact-us-form-controls" data-validation="control">
                                                    <textarea rows='10' class='form-control' id="text" name='message' placeholder='Message'>{{message}}</textarea>
                                                </div>
                                            </div>
                                            <button type='submit' class='contact-us-form-btn'>SUBMIT</button>
                                            <div id='alert-container'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>