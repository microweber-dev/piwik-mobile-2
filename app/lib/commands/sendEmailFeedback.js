function onEmailSent(event)
{
    if (OS_IOS && event && event.result && event.result == this.SENT) {
        // android doesn't give us useful result codes. it anyway shows a toast.
        
        var L = require('L');

        Ti.UI.createAlertDialog({message: L('Feedback_ThankYou'), ok: L('General_Ok')}).show();
    }
}

function platformMessage()
{
    return String.format('Platform: %s %s %s', 
                         '' + Ti.Platform.name, 
                         '' + Ti.Platform.version, 
                         '' + Ti.Platform.model);
}

function versionMessage()
{
    return String.format("Version: %s - %s %s",
                         '' + Ti.App.version,
                         '' + Ti.version,
                         '' + Ti.buildHash);
}

function resolutionMessage()
{
    var caps = Ti.Platform.displayCaps;

    return String.format("Resolution: %sx%s %s (%s)",
                         '' + caps.platformWidth, 
                         '' + caps.platformHeight, 
                         '' + caps.density, 
                         '' + caps.dpi);
}

function localeMessage()
{
    return String.format("Locale: %s", '' + Ti.Platform.locale);
}

function networkMessage()
{
    return String.format("Network: %s", '' + Ti.Network.networkTypeName);
}

function memoryMessage()
{
    return "Available memory: " + Ti.Platform.availableMemory
}

function emailMessageBody()
{
    var message = 'Your Message: \n\n\nYour Device: \n';
    message    += platformMessage() + '\n';
    message    += versionMessage() + '\n';
    message    += memoryMessage() + '\n';
    message    += resolutionMessage() + '\n';
    message    += localeMessage() + '\n';
    message    += networkMessage();

    return message;
}

exports.execute = function () 
{
    var emailDialog = Ti.UI.createEmailDialog();
    emailDialog.setSubject("Feedback Piwik Mobile");
    emailDialog.setToRecipients(['mobile@piwik.org']);

    if (emailDialog.setBarColor) {
        emailDialog.setBarColor('#B2AEA5');
    }

    if (!emailDialog.isSupported()) {
        var L = require('L');
        Ti.UI.createAlertDialog({message: 'Please install an email app', ok: L('General_Ok')}).show();

        return;
    }

    emailDialog.setMessageBody(emailMessageBody());
    emailDialog.addEventListener('complete', onEmailSent);
    emailDialog.open();
    emailDialog = null;
}