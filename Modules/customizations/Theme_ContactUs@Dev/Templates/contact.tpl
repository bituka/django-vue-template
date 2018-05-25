{{! © 2017 NetSuite Inc. User may not copy, modify, distribute, or re-bundle or otherwise make available this code; provided,
however, if you are an authorized user with a NetSuite account or log-in, you may use this code subject to the terms that
govern your access and use. }}

<!--CONTACT US  -->
<section class='theme-landing-page' id='theme-contact-us'>

    <div class="contact-us-content" data-cms-area="contact_full-banner-2" data-cms-area-filters="path"></div>

    <div class="contact-us-form">

        <div class="contact-us-form-content">
            <div class='row'>
                <div class='container'>
                    <div class='col-md-12'>

                        <form id="contact-us-form" class="contact-us-form-new" action="POST">

                            <div class='container'>
                                <div class='row'>
                                    <div class='col-md-12'>
                                        <div data-type="alert-placeholder"></div>
                                        <div class='contact-us-form-box'>
                                            <div data-validation="control-group" data-input="firstname">
                                                <div class="contact-us-form-controls" data-validation="control">
                                                    <input type='text' placeholder='First Name*' id="firstname" name='firstname' value="{{firstname}}">
                                                </div>
                                            </div>
                                            <div data-validation="control-group" data-input="lastname">
                                                <div class="contact-us-form-controls" data-validation="control">
                                                    <input type='text' placeholder='Last Name' id="lastname" name='lastname' value="{{lastname}}">
                                                </div>
                                            </div>
                                            <div data-validation="control-group" data-input="email">
                                                <div class="contact-us-form-controls" data-validation="control">
                                                    <input type='text' placeholder='Email*' id="email" name='email' value="{{email}}">
                                                </div>
                                            </div>
                                            <div data-validation="control-group" data-input="phone">
                                                <div class="contact-us-form-controls" data-validation="control">
                                                    <input type='text' placeholder='Phone' id="phone" name='phone' value="{{phone}}">
                                                </div>
                                            </div>
                                            <div data-validation="control-group" data-input="ordernumber">
                                                <div class="contact-us-form-controls" data-validation="control">
                                                    <input type='text' placeholder='Order Number' id="ordernumber" name='ordernumber' value="{{ordernumber}}">
                                                </div>
                                            </div>
                                            <div data-validation="control-group" data-input="subject">
                                                <div class="contact-us-form-controls" data-validation="control">
                                                    <input type='text' placeholder='Subject*' id="subject" name='subject' value="{{subject}}">
                                                </div>
                                            </div>
                                            <div data-validation="control-group" data-input="message">
                                                <div class="contact-us-form-controls" data-validation="control">
                                                    <textarea rows='10' class='form-control' id="text" name='message' placeholder='Message*'>{{message}}</textarea>
                                                </div>
                                            </div>
                                            <button type='submit' class='contact-us-form-btn'>SUBMIT</button>
                                            <div id='alert-container' style="margin-top:20px;"></div>
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