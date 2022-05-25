import requests
from itertools import zip_longest
import datetime
from bs4 import BeautifulSoup
import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="system",
    database="gps",
    auth_plugin='mysql_native_password'
)
sql = db.cursor()
formationIds = []
formationNames = []
formationTypes = []
formationDatesIn = []
formationDatesOut = []
formationDatesIns = []
formationAddress = []
formationPictures = []
formationDescription = []
formationInscriptions = []
listing = [formationIds, formationNames, formationTypes, formationDatesIn, formationDatesOut, formationDatesIns,
           formationAddress, formationPictures, formationDescription, formationInscriptions]
formation = zip_longest(*listing)
formationFianle = []
formationFianle2 = []
formationRemove = []
certificationIds = []
certificationNames = []
certificationTypes = []
certificationDatesIn = []
certificationDatesOut = []
certificationDatesIns = []
certificationAddress = []
certificationPictures = []
certificationDescription = []
certificationInscriptions = []
listing = [certificationIds, certificationNames, certificationTypes, certificationDatesIn, certificationDatesOut,
           certificationDatesIns,
           certificationAddress, certificationPictures, certificationDescription,
           certificationInscriptions]
certication = zip_longest(*listing)
certicationFinale = []
certicationFinale2 = []
certicationRemove = []
journeyIds = []
journeyNames = []
journeyTypes = []
journeyDatesIn = []
journeyDatesOut = []
journeyDatesIns = []
journeyAddress = []
journeyPictures = []
journeyDescription = []
journeyInscriptions = []
listing = [journeyIds, journeyNames, journeyTypes, journeyDatesIn, journeyDatesOut, journeyDatesIns,
           journeyAddress, journeyPictures, journeyDescription, journeyInscriptions]
journey = zip_longest(*listing)
journeyFinale = []
journeyFinale2 = []
journeyRemove = []


def compare(y):
    # this function is to compare the event day to the actual date, if it has passed it will be returned false
    if (str(y) == 'None'):
        return False
    return datetime.datetime.now() <= datetime.datetime(int(y.split(' ')[0].split('-')[0]),
                                                        int(y.split(' ')[0].split('-')[1]),
                                                        int(y.split(' ')[0].split('-')[2]))


def dating(y):
    # this function transform the date displayement
    return (y.split(' ')[0].split('-')[1]) + "/" + (y.split(' ')[0].split('-')[2]) + "/" + (
        y.split(' ')[0].split('-')[0])


def notFound(element, listElement):
    # this function return either an event exist in the database or not
    notFound = False
    for i in listElement:
        if (element[0] != i[20]):
            notFound = True
        else:
            notFound = False
            break
    return notFound


def loadDataOfFormation():
    # this method is for loading the trainings from the 4c platform
    cookies = {
        '__RequestVerificationToken': 'KsDqXAdRYRKPcywfMiFbWVZcbtLSFoxEa3M-khjaI5u_qS2WjyxxRs_tJsF0NxvKEvcCTOOTAJYFOrD1pn_tz2f4hzX7nhQ6p9QkxbjsZ2I1',
        'BNES___RequestVerificationToken': 'UbT45Xcn/q0HBxUBey7wes6YoTMpy5bIpMwonYoWHasLdKzEn1dMKAZ5m6EiKZ8/5G2rN9BBs3grYykI9vm9Rk4wn3kljnbFebwRLxMjZXI5hS5H5fKdko2TfE//E4U2JTp3o3PSYu4hEIXnS5lY6FvGZeo2HECHTNz/z/Fn4LMOdESWigXRCJxrPnHv9pgOnbxtOhiOV4XUa8H0SXurhl3lUin4n9UBK16GEDYijq8=',
        'ASP.NET_SessionId': 'psog5qyaqb4xkhcdjbqs2q45',
        '.ASPXAUTH': '2516FF0DFD7876AF95918FC8A9BAB4B235E44CA99F08947569F9A74E71EDDA0C5B843892D7BE2124EEFC34AC19DB0F60316FEF6E8F99F56BAFD69C30BFF1BB34F7E0B9CAC34311D99A8756D75DA329B8133AD481BB6825D1436F79405C3065360D2DFD4ED001A76F1838A80502D355A413FCFDD5A135C9C7E87DBCEEC99825CBA5F5173E207D9F65C5A94104FCA72048',
        'BNES_ASP.NET_SessionId': 'LfJY5BdAjgKfKiu/QM7T6hL/Q5kwSALFYpOp69Ewo9KgzxQBxsIUyZoG2O9bMav64b259NmdBywIV8xbDWjDJJspW42j0aRAY36xTMH7Juw=',
        'BNES_.ASPXAUTH': 'KT0zqP/+i8OpGFAPppqpLp52pwFJBDtLSKRkOQVEIIw+HORSiPSW5ungPZMrsCqTQCs/JSRopknYw+4fuhY3KrlYRwYvHFtzjxo/AEoSVChGcjFIE902jQymE4FbJX5pA5xSxD/z3PTD57D1I/IU4e57DbBUzJ8VDjVlOe+mn1Dm3CcgGHR//2nIwZKKR5qyjUrckIpbBmrNVdX97lX6QE3ScMzkoy41EzsNEnVWnnzunNvvR6A7cgJO1g5VthDm310cM+WkwBeZfY1kMBe19TOU6pA49oppE7nSh6SWS8vP2PvxFcA1ZTZbYzth9GtP7Y4jXxlQKOeYAGOnV76IQCW7ButKQULEkflsoXPrY1GvB/D5/Pm8sFd/My8op8yEcpXTwPXrVHsTnrKuNdUL/NAfGk9NZ/7zgnKPxkoxGCDHIg2dG/zXA0s+9CtkN7pU',
    }
    headers = {
        'Connection': 'keep-alive',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
        'sec-ch-ua-platform': '"Linux"',
        'Origin': 'https://www.4c.tn',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://www.4c.tn/Home/AccueilEtudiant',
        'Accept-Language': 'en-US,en;q=0.9',
    }
    data = {
        'draw': '1',
        'columns[0][data]': 'Formation_Id',
        'columns[0][name]': '',
        'columns[0][searchable]': 'false',
        'columns[0][orderable]': 'true',
        'columns[0][search][value]': '',
        'columns[0][search][regex]': 'false',
        'columns[1][data]': '1',
        'columns[1][name]': '',
        'columns[1][searchable]': 'true',
        'columns[1][orderable]': 'true',
        'columns[1][search][value]': '',
        'columns[1][search][regex]': 'false',
        'columns[2][data]': '2',
        'columns[2][name]': '',
        'columns[2][searchable]': 'true',
        'columns[2][orderable]': 'true',
        'columns[2][search][value]': '',
        'columns[2][search][regex]': 'false',
        'columns[3][data]': '3',
        'columns[3][name]': '',
        'columns[3][searchable]': 'true',
        'columns[3][orderable]': 'true',
        'columns[3][search][value]': '',
        'columns[3][search][regex]': 'false',
        'order[0][column]': '0',
        'order[0][dir]': 'desc',
        'start': '0',
        'length': '10',
        'search[value]': '',
        'search[regex]': 'false'
    }

    response = requests.post('https://www.4c.tn/Actualites/LoadDataFormation', headers=headers, cookies=cookies,
                             data=data)
    ch = response.text + ''
    ch = ch.replace('{', '')
    ch = ch.replace('[', '')
    ch = ch.replace(']', '')
    ch = ch.replace('}', '')
    ls = ch.split(',')
    ls.__delitem__(0)
    ls.__delitem__(0)
    ls.__delitem__(0)
    # this loop is to collect the data from plateform the fist page
    for i, l in enumerate(ls):
        if ('Formation_Name' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationNames.append(ll[1])
        if ('couverture' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationPictures.append("https://www.4c.tn/Content/images/Formation/Couverture/" + ll[1])
        if ('Formation_Id' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationIds.append(ll[-1])
            formationInscriptions.append('https://www.4c.tn/Home/AccueilEtudiant#DetailsFormations/' + ll[-1])
        if ('type' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationTypes.append(ll[1])
        if ('Date_Debut' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationDatesIn.append(ll[1])
        if ('Date_Fin' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationDatesOut.append(ll[1])
        if ('Date_Inscription' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationDatesIns.append(ll[1])
        if ('adresse' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationAddress.append(ll[1])
        if ('Description' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationDescription.append(ll[1])
    # Same treatment but for the second page
    data = {
        'draw': '2',
        'columns[0][data]': 'Formation_Id',
        'columns[0][name]': '',
        'columns[0][searchable]': 'false',
        'columns[0][orderable]': 'true',
        'columns[0][search][value]': '',
        'columns[0][search][regex]': 'false',
        'columns[1][data]': '1',
        'columns[1][name]': '',
        'columns[1][searchable]': 'true',
        'columns[1][orderable]': 'true',
        'columns[1][search][value]': '',
        'columns[1][search][regex]': 'false',
        'columns[2][data]': '2',
        'columns[2][name]': '',
        'columns[2][searchable]': 'true',
        'columns[2][orderable]': 'true',
        'columns[2][search][value]': '',
        'columns[2][search][regex]': 'false',
        'columns[3][data]': '3',
        'columns[3][name]': '',
        'columns[3][searchable]': 'true',
        'columns[3][orderable]': 'true',
        'columns[3][search][value]': '',
        'columns[3][search][regex]': 'false',
        'order[0][column]': '0',
        'order[0][dir]': 'desc',
        'start': '10',
        'length': '10',
        'search[value]': '',
        'search[regex]': 'false'
    }

    response = requests.post('https://www.4c.tn/Actualites/LoadDataFormation', headers=headers, cookies=cookies,
                             data=data)
    ch = response.text + ''
    ch = ch.replace('{', '')
    ch = ch.replace('[', '')
    ch = ch.replace(']', '')
    ch = ch.replace('}', '')
    ls = ch.split(',')
    ls.__delitem__(0)
    ls.__delitem__(0)
    ls.__delitem__(0)
    for i, l in enumerate(ls):
        if ('Formation_Name' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationNames.append(ll[1])
        if ('couverture' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationPictures.append("https://www.4c.tn/Content/images/Formation/Couverture/" + ll[1])
        if ('Formation_Id' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationIds.append(ll[-1])
            formationInscriptions.append('https://www.4c.tn/Home/AccueilEtudiant#DetailsFormations/' + ll[-1])
        if ('type' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationTypes.append(ll[1])
        if ('Date_Debut' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationDatesIn.append(ll[1])
        if ('Date_Fin' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationDatesOut.append(ll[1])
        if ('Date_Inscription' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationDatesIns.append(ll[1])
        if ('adresse' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationAddress.append(ll[1])
        if ('Description' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationDescription.append(ll[1])

    # Same thing but for the third page
    data = {
        'draw': '3',
        'columns[0][data]': 'Formation_Id',
        'columns[0][name]': '',
        'columns[0][searchable]': 'false',
        'columns[0][orderable]': 'true',
        'columns[0][search][value]': '',
        'columns[0][search][regex]': 'false',
        'columns[1][data]': '1',
        'columns[1][name]': '',
        'columns[1][searchable]': 'true',
        'columns[1][orderable]': 'true',
        'columns[1][search][value]': '',
        'columns[1][search][regex]': 'false',
        'columns[2][data]': '2',
        'columns[2][name]': '',
        'columns[2][searchable]': 'true',
        'columns[2][orderable]': 'true',
        'columns[2][search][value]': '',
        'columns[2][search][regex]': 'false',
        'columns[3][data]': '3',
        'columns[3][name]': '',
        'columns[3][searchable]': 'true',
        'columns[3][orderable]': 'true',
        'columns[3][search][value]': '',
        'columns[3][search][regex]': 'false',
        'order[0][column]': '0',
        'order[0][dir]': 'desc',
        'start': '20',
        'length': '10',
        'search[value]': '',
        'search[regex]': 'false'
    }
    response = requests.post('https://www.4c.tn/Actualites/LoadDataFormation', headers=headers, cookies=cookies,
                             data=data)
    ch = response.text + ''
    ch = ch.replace('{', '')
    ch = ch.replace('[', '')
    ch = ch.replace(']', '')
    ch = ch.replace('}', '')
    ls = ch.split(',')
    ls.__delitem__(0)
    ls.__delitem__(0)
    ls.__delitem__(0)
    for i, l in enumerate(ls):
        if ('Formation_Name' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationNames.append(ll[1])
        if ('couverture' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationPictures.append("https://www.4c.tn/Content/images/Formation/Couverture/" + ll[1])
        if ('Formation_Id' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationIds.append(ll[-1])
            formationInscriptions.append('https://www.4c.tn/Home/AccueilEtudiant#DetailsFormations/' + ll[-1])
        if ('type' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationTypes.append(ll[1])
        if ('Date_Debut' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationDatesIn.append(ll[1])
        if ('Date_Fin' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationDatesOut.append(ll[1])
        if ('Date_Inscription' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationDatesIns.append(ll[1])
        if ('adresse' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationAddress.append(ll[1])
        if ('Description' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            formationDescription.append(ll[1])
    filtreFormation()
    scrapeFormation()
    updateFormation()


def loadDataOfCertification():
    cookies = {
        '__RequestVerificationToken': 'KsDqXAdRYRKPcywfMiFbWVZcbtLSFoxEa3M-khjaI5u_qS2WjyxxRs_tJsF0NxvKEvcCTOOTAJYFOrD1pn_tz2f4hzX7nhQ6p9QkxbjsZ2I1',
        'BNES___RequestVerificationToken': 'UbT45Xcn/q0HBxUBey7wes6YoTMpy5bIpMwonYoWHasLdKzEn1dMKAZ5m6EiKZ8/5G2rN9BBs3grYykI9vm9Rk4wn3kljnbFebwRLxMjZXI5hS5H5fKdko2TfE//E4U2JTp3o3PSYu4hEIXnS5lY6FvGZeo2HECHTNz/z/Fn4LMOdESWigXRCJxrPnHv9pgOnbxtOhiOV4XUa8H0SXurhl3lUin4n9UBK16GEDYijq8=',
        'ASP.NET_SessionId': 'psog5qyaqb4xkhcdjbqs2q45',
        '.ASPXAUTH': '2516FF0DFD7876AF95918FC8A9BAB4B235E44CA99F08947569F9A74E71EDDA0C5B843892D7BE2124EEFC34AC19DB0F60316FEF6E8F99F56BAFD69C30BFF1BB34F7E0B9CAC34311D99A8756D75DA329B8133AD481BB6825D1436F79405C3065360D2DFD4ED001A76F1838A80502D355A413FCFDD5A135C9C7E87DBCEEC99825CBA5F5173E207D9F65C5A94104FCA72048',
        'BNES_ASP.NET_SessionId': 'LfJY5BdAjgKfKiu/QM7T6hL/Q5kwSALFYpOp69Ewo9KgzxQBxsIUyZoG2O9bMav64b259NmdBywIV8xbDWjDJJspW42j0aRAY36xTMH7Juw=',
        'BNES_.ASPXAUTH': 'KT0zqP/+i8OpGFAPppqpLp52pwFJBDtLSKRkOQVEIIw+HORSiPSW5ungPZMrsCqTQCs/JSRopknYw+4fuhY3KrlYRwYvHFtzjxo/AEoSVChGcjFIE902jQymE4FbJX5pA5xSxD/z3PTD57D1I/IU4e57DbBUzJ8VDjVlOe+mn1Dm3CcgGHR//2nIwZKKR5qyjUrckIpbBmrNVdX97lX6QE3ScMzkoy41EzsNEnVWnnzunNvvR6A7cgJO1g5VthDm310cM+WkwBeZfY1kMBe19TOU6pA49oppE7nSh6SWS8vP2PvxFcA1ZTZbYzth9GtP7Y4jXxlQKOeYAGOnV76IQCW7ButKQULEkflsoXPrY1GvB/D5/Pm8sFd/My8op8yEcpXTwPXrVHsTnrKuNdUL/NAfGk9NZ/7zgnKPxkoxGCDHIg2dG/zXA0s+9CtkN7pU',
    }
    headers = {
        'Connection': 'keep-alive',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
        'sec-ch-ua-platform': '"Linux"',
        'Origin': 'https://www.4c.tn',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://www.4c.tn/Home/AccueilEtudiant',
        'Accept-Language': 'en-US,en;q=0.9',
    }
    data = {
        'draw': '1',
        'columns[0][data]': 'Certif_Id',
        'columns[0][name]': '',
        'columns[0][searchable]': 'false',
        'columns[0][orderable]': 'true',
        'columns[0][search][value]': '',
        'columns[0][search][regex]': 'false',
        'columns[1][data]': '1',
        'columns[1][name]': '',
        'columns[1][searchable]': 'true',
        'columns[1][orderable]': 'true',
        'columns[1][search][value]': '',
        'columns[1][search][regex]': 'false',
        'columns[2][data]': '2',
        'columns[2][name]': '',
        'columns[2][searchable]': 'true',
        'columns[2][orderable]': 'true',
        'columns[2][search][value]': '',
        'columns[2][search][regex]': 'false',
        'columns[3][data]': '3',
        'columns[3][name]': '',
        'columns[3][searchable]': 'true',
        'columns[3][orderable]': 'true',
        'columns[3][search][value]': '',
        'columns[3][search][regex]': 'false',
        'order[0][column]': '0',
        'order[0][dir]': 'desc',
        'start': '0',
        'length': '10',
        'search[value]': '',
        'search[regex]': 'false'
    }
    response = requests.post('https://www.4c.tn/Actualites/LoadDataCertification', headers=headers, cookies=cookies,
                             data=data)

    ch = response.text + ''
    ch = ch.replace('{', '')
    ch = ch.replace('[', '')
    ch = ch.replace(']', '')
    ch = ch.replace('}', '')
    ls = ch.split(',')
    ls.__delitem__(0)
    ls.__delitem__(0)
    ls.__delitem__(0)
    for i, l in enumerate(ls):
        if ('Certificat_Name' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            certificationNames.append(ll[1])
        if ('photo' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            certificationPictures.append("https://www.4c.tn/Content/images/Certificat/" + ll[1])
        if ('Certif_Id' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            certificationIds.append(ll[-1])
            certificationInscriptions.append('https://www.4c.tn/Home/AccueilEtudiant#DetailsCertifications/' + ll[-1])
        if ('type' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            certificationTypes.append(ll[1])
        if ('Date_Debut' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            certificationDatesIn.append(ll[1])
        if ('Date_Fin' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            certificationDatesOut.append(ll[1])
        if ('Date_Inscription' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            certificationDatesIns.append(ll[1])
        if ('adresse' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            certificationAddress.append(ll[1])
        if ('Description' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            certificationDescription.append(ll[1])

    data = {
        'draw': '2',
        'columns[0][data]': 'Certif_Id',
        'columns[0][name]': '',
        'columns[0][searchable]': 'false',
        'columns[0][orderable]': 'true',
        'columns[0][search][value]': '',
        'columns[0][search][regex]': 'false',
        'columns[1][data]': '1',
        'columns[1][name]': '',
        'columns[1][searchable]': 'true',
        'columns[1][orderable]': 'true',
        'columns[1][search][value]': '',
        'columns[1][search][regex]': 'false',
        'columns[2][data]': '2',
        'columns[2][name]': '',
        'columns[2][searchable]': 'true',
        'columns[2][orderable]': 'true',
        'columns[2][search][value]': '',
        'columns[2][search][regex]': 'false',
        'columns[3][data]': '3',
        'columns[3][name]': '',
        'columns[3][searchable]': 'true',
        'columns[3][orderable]': 'true',
        'columns[3][search][value]': '',
        'columns[3][search][regex]': 'false',
        'order[0][column]': '0',
        'order[0][dir]': 'desc',
        'start': '10',
        'length': '10',
        'search[value]': '',
        'search[regex]': 'false'
    }

    response = requests.post('https://www.4c.tn/Actualites/LoadDataCertification', headers=headers, cookies=cookies,
                             data=data)
    ch = response.text + ''
    ch = ch.replace('{', '')
    ch = ch.replace('[', '')
    ch = ch.replace(']', '')
    ch = ch.replace('}', '')
    ls = ch.split(',')
    ls.__delitem__(0)
    ls.__delitem__(0)
    ls.__delitem__(0)
    for i, l in enumerate(ls):
        if ('Certificat_Name' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            certificationNames.append(ll[1])
        if ('photo' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            certificationPictures.append("https://www.4c.tn/Content/images/Certificat" + ll[1])
        if ('Certif_Id' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            certificationIds.append(ll[-1])
            certificationInscriptions.append('https://www.4c.tn/Home/AccueilEtudiant#DetailsCertifications/' + ll[-1])
        if ('type' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            certificationTypes.append(ll[1])
        if ('Date_Debut' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            certificationDatesIn.append(ll[1])
        if ('Date_Fin' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            certificationDatesOut.append(ll[1])
        if ('Date_Inscription' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            certificationDatesIns.append(ll[1])
        if ('adresse' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            certificationAddress.append(ll[1])
        if ('Description' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            certificationDescription.append(ll[1])
    filtreCertificatoin()
    scrapeCertification()
    updateCertification()


def loadDataOfJourney():
    cookies = {
        '__RequestVerificationToken': '3oQtuqteUrkta4ndw6Mi_SZLEyqbWB7bVp1NEhCSCwZK6sFloni_EHsgsrQP2G0y3PE8FaT0RjJwv0ESvt2XEnn5H8rRW6SPPiQCU-2W9rM1',
        'BNES___RequestVerificationToken': 'tODxNciOx8RMuvArbv4ZLmBfrfeh8HlkqmPfL61r/Ogq8DwcIm5ZO2Y8DbIwDqTfDSeBPA9ONDIY9tvpj8+kwLQq2d3c5v7NEqwv6G+Zj3Se5EyUChUUPY9QLG4nXmWtX4/CdKqxLwX7IXQVAmB8Hb/r6j6LoTx81P6lHFlmpt+rJaEpo9WBYhZG7Ap0C5PjwXNZwHKqjzox4u15DM8UsmCfqklnO/1CFuGcAblRF/Q=',
        'ASP.NET_SessionId': 'jxxbp2vzapkviwc3l4daen3e',
        '.ASPXAUTH': '8AE40FA33A32CDEE42CE0BFB75C975103A93BA932E807E999E27B9F72BB723C94A9339EA91E842726FA367B423B4346761938F8564E63DAFA7CDC049A55ECF0A3F0E7157F6C309BE111E440153D2B53FD541DB316ED50A217578F4F576CE7D058745BABF02BD016F9DCB17FEB7B655C47838EA402D78DE62D5575F4CF0A4FCE0F5467D4D0A81C6ADBC7B28DAA614741B',
        'BNES_ASP.NET_SessionId': '8ZWJTttdAkpo7YAJR++xsxwZdtp1S+cSh/4dB6EZrILkjYlOZV1MN2/1042IdmDeST5P50FB9UCxbVCGxZ4QNAO1nmyDPuueJUOclWILcYA=',
        'BNES_.ASPXAUTH': 'd2QEolS/5VwLu/M/O+wWr0Ig8xuvxFzIR9rl/6SNypMwYfdJc3U3wcOZQl5qLmTPF8Cee/QCmJNnymQKOwJXSHlM3l+HzA6sSer3334UGK4CvdHvRCHuqmTUV6elRnLie098dFJSDjGct0Pa3mPrnuAGo9VnHl0y1b07paTD4qO6IkwzVpq5fFs5vgoKmlN/QF0wtNGy4xPIskVurNFOXAAn9QwywfG8ScNyhmGEnEmOnEGZs64lgmOM5lOU6qVBxdLg6F+9y+lLWuLoQWlhcxzt/2pYJ831yvUWUHNhe18IYd4lYlWvqhrlemdnCICEjbSAuAGSR9KFhwhIkaeGz0TDv5WH7jtG/CslHQOKeMCz8omVgn6LKsusSTI12GB4szuopPHsF1XzQPBi3MPQkonLSMigMoKDyYmFfRcs0oWICafFcvzBGz5WKmiK+Nb0',
    }
    headers = {
        'Connection': 'keep-alive',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
        'sec-ch-ua-platform': '"Linux"',
        'Origin': 'https://www.4c.tn',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://www.4c.tn/Home/AccueilEtudiant',
        'Accept-Language': 'en-US,en;q=0.9',
    }
    data = {
        'draw': '1',
        'columns[0][data]': 'Evenement_Id',
        'columns[0][name]': '',
        'columns[0][searchable]': 'false',
        'columns[0][orderable]': 'true',
        'columns[0][search][value]': '',
        'columns[0][search][regex]': 'false',
        'columns[1][data]': '1',
        'columns[1][name]': '',
        'columns[1][searchable]': 'true',
        'columns[1][orderable]': 'true',
        'columns[1][search][value]': '',
        'columns[1][search][regex]': 'false',
        'columns[2][data]': '2',
        'columns[2][name]': '',
        'columns[2][searchable]': 'true',
        'columns[2][orderable]': 'true',
        'columns[2][search][value]': '',
        'columns[2][search][regex]': 'false',
        'columns[3][data]': '3',
        'columns[3][name]': '',
        'columns[3][searchable]': 'true',
        'columns[3][orderable]': 'true',
        'columns[3][search][value]': '',
        'columns[3][search][regex]': 'false',
        'order[0][column]': '0',
        'order[0][dir]': 'desc',
        'start': '0',
        'length': '10',
        'search[value]': '',
        'search[regex]': 'false'
    }

    response = requests.post('https://www.4c.tn/Actualites/LoadDataEvnement', headers=headers, cookies=cookies,
                             data=data)
    ch = response.text + ''
    ch = ch.replace('{', '')
    ch = ch.replace('[', '')
    ch = ch.replace(']', '')
    ch = ch.replace('}', '')
    ls = ch.split(',')
    ls.__delitem__(0)
    ls.__delitem__(0)
    ls.__delitem__(0)
    for i, l in enumerate(ls):
        if ('Evnement_Name' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyNames.append(ll[1])
        if ('couverture' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyPictures.append("https://www.4c.tn/Content/images/Evenements/Couverture/" + ll[1])
        if ('Evenement_Id' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyIds.append(ll[-1])
            journeyInscriptions.append('https://www.4c.tn/Home/AccueilEtudiant#DetailsEvenements/' + ll[-1])
        if ('type' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyTypes.append(ll[1])
        if ('Date_Debut' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyDatesIn.append(ll[1])
        if ('Date_Fin' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyDatesOut.append(ll[1])
        if ('Date_Inscription' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyDatesIns.append(ll[1])
        if ('adresse' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyAddress.append(ll[1])
        if ('Description' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyDescription.append(ll[1])

    data = {
        'draw': '2',
        'columns[0][data]': 'Evenement_Id',
        'columns[0][name]': '',
        'columns[0][searchable]': 'false',
        'columns[0][orderable]': 'true',
        'columns[0][search][value]': '',
        'columns[0][search][regex]': 'false',
        'columns[1][data]': '1',
        'columns[1][name]': '',
        'columns[1][searchable]': 'true',
        'columns[1][orderable]': 'true',
        'columns[1][search][value]': '',
        'columns[1][search][regex]': 'false',
        'columns[2][data]': '2',
        'columns[2][name]': '',
        'columns[2][searchable]': 'true',
        'columns[2][orderable]': 'true',
        'columns[2][search][value]': '',
        'columns[2][search][regex]': 'false',
        'columns[3][data]': '3',
        'columns[3][name]': '',
        'columns[3][searchable]': 'true',
        'columns[3][orderable]': 'true',
        'columns[3][search][value]': '',
        'columns[3][search][regex]': 'false',
        'order[0][column]': '0',
        'order[0][dir]': 'desc',
        'start': '10',
        'length': '10',
        'search[value]': '',
        'search[regex]': 'false'
    }
    response = requests.post('https://www.4c.tn/Actualites/LoadDataEvnement', headers=headers, cookies=cookies,
                             data=data)
    ch = response.text + ''
    ch = ch.replace('{', '')
    ch = ch.replace('[', '')
    ch = ch.replace(']', '')
    ch = ch.replace('}', '')
    ls = ch.split(',')
    ls.__delitem__(0)
    ls.__delitem__(0)
    ls.__delitem__(0)
    for i, l in enumerate(ls):
        if ('Evnement_Name' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyNames.append(ll[1])
        if ('couverture' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyPictures.append("https://www.4c.tn/Content/images/Evenements/Couverture/" + ll[1])
        if ('Evenement_Id' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyIds.append(ll[-1])
            journeyInscriptions.append('https://www.4c.tn/Home/AccueilEtudiant#DetailsEvenements/' + ll[-1])
        if ('type' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyTypes.append(ll[1])
        if ('Date_Debut' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyDatesIn.append(ll[1])
        if ('Date_Fin' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyDatesOut.append(ll[1])
        if ('Date_Inscription' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyDatesIns.append(ll[1])
        if ('adresse' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyAddress.append(ll[1])
        if ('Description' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyDescription.append(ll[1])

    data = {
        'draw': '4',
        'columns[0][data]': 'Evenement_Id',
        'columns[0][name]': '',
        'columns[0][searchable]': 'false',
        'columns[0][orderable]': 'true',
        'columns[0][search][value]': '',
        'columns[0][search][regex]': 'false',
        'columns[1][data]': '1',
        'columns[1][name]': '',
        'columns[1][searchable]': 'true',
        'columns[1][orderable]': 'true',
        'columns[1][search][value]': '',
        'columns[1][search][regex]': 'false',
        'columns[2][data]': '2',
        'columns[2][name]': '',
        'columns[2][searchable]': 'true',
        'columns[2][orderable]': 'true',
        'columns[2][search][value]': '',
        'columns[2][search][regex]': 'false',
        'columns[3][data]': '3',
        'columns[3][name]': '',
        'columns[3][searchable]': 'true',
        'columns[3][orderable]': 'true',
        'columns[3][search][value]': '',
        'columns[3][search][regex]': 'false',
        'order[0][column]': '0',
        'order[0][dir]': 'desc',
        'start': '30',
        'length': '10',
        'search[value]': '',
        'search[regex]': 'false'
    }
    response = requests.post('https://www.4c.tn/Actualites/LoadDataEvnement', headers=headers, cookies=cookies,
                             data=data)
    ch = response.text + ''
    ch = ch.replace('{', '')
    ch = ch.replace('[', '')
    ch = ch.replace(']', '')
    ch = ch.replace('}', '')
    ls = ch.split(',')
    ls.__delitem__(0)
    ls.__delitem__(0)
    ls.__delitem__(0)
    for i, l in enumerate(ls):
        if ('Evnement_Name' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyNames.append(ll[1])
        if ('couverture' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyPictures.append("https://www.4c.tn/Content/images/Evenements/Couverture/" + ll[1])
        if ('Evenement_Id' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyIds.append(ll[-1])
            journeyInscriptions.append('https://www.4c.tn/Home/AccueilEtudiant#DetailsEvenements/' + ll[-1])
        if ('type' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyTypes.append(ll[1])
        if ('Date_Debut' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyDatesIn.append(ll[1])
        if ('Date_Fin' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyDatesOut.append(ll[1])
        if ('Date_Inscription' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyDatesIns.append(ll[1])
        if ('adresse' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyAddress.append(ll[1])
        if ('Description' in l):
            h = l.replace('\\', '')
            h = l.replace('"', '')
            ll = h.split(':')
            journeyDescription.append(ll[1])

    filtreJourney()
    scrapeJourney()
    updateJourney()


def filtreFormation():
    # this method to keep just the recent training and to put all the passed event to delete later from the database
    for i in formation:
        if compare(i[4]):
            print(i)
            formationFianle.append(i)
        else:
            formationRemove.append(i)


def filtreCertificatoin():
    for i in certication:
        if compare(i[4]):
            certicationFinale.append(i)
        else:
            certicationRemove.append(i)


def filtreJourney():
    for i in journey:
        if compare(i[4]):
            journeyFinale.append(i)
        else:
            journeyRemove.append(i)


def scrapeFormation():
    # this to connect as mahdi hadj sassi in the 4c plateform
    cookies = {
        '__RequestVerificationToken': '3oQtuqteUrkta4ndw6Mi_SZLEyqbWB7bVp1NEhCSCwZK6sFloni_EHsgsrQP2G0y3PE8FaT0RjJwv0ESvt2XEnn5H8rRW6SPPiQCU-2W9rM1',
        'BNES___RequestVerificationToken': 'tODxNciOx8RMuvArbv4ZLmBfrfeh8HlkqmPfL61r/Ogq8DwcIm5ZO2Y8DbIwDqTfDSeBPA9ONDIY9tvpj8+kwLQq2d3c5v7NEqwv6G+Zj3Se5EyUChUUPY9QLG4nXmWtX4/CdKqxLwX7IXQVAmB8Hb/r6j6LoTx81P6lHFlmpt+rJaEpo9WBYhZG7Ap0C5PjwXNZwHKqjzox4u15DM8UsmCfqklnO/1CFuGcAblRF/Q=',
    }
    headers = {
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'Upgrade-Insecure-Requests': '1',
        'Origin': 'https://www.4c.tn',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-User': '?1',
        'Sec-Fetch-Dest': 'document',
        'Referer': 'https://www.4c.tn/Account/Login',
        'Accept-Language': 'en-US,en;q=0.9',
    }
    data = {
        '__RequestVerificationToken': 'EwGM95UpdCVj0tlc9CesUXwOsQ9meRF2V7nv_D-P1s6NzHonNq4_0eLLnNlQqowXYlhhc6q1SbOg35Pj8vx4Pq67Cd687VVLnfACAWNyeBM1',
        'Email': 'mahdihadjsassi@fsb.u-carthage.tn',
        'Password': 'Mahdihadjsassi1',
        'RememberMe': 'false'
    }
    with requests.session() as s:
        response = s.post('https://www.4c.tn/Account/Login', headers=headers, cookies=cookies, data=data)
        for j, i in enumerate(formationFianle):
            # this is to load each training individually and to extract important data from it
            cookies = {
                '__RequestVerificationToken': 'xGTyccYT6rud1plMdKzox4DJgY1fAPEXdyWgJeg95dGz-vQ-aqXF5lum0xZp0HXMykuHyOykPg0x4kPIz9lsVR9cUuK1OseDHBDLcfrWK3E1',
                'BNES___RequestVerificationToken': 'tJrXV0ZYnkea/kThcLnFXPxUgRgIhXrRucLgRpD34KwXjYbkbGSNLSRFQdlWX/VIoQh5LrSbOFuTSGUWrUBUComZR4I7ADYZnNn5o+vOVHrKJ9shF5XxwDobzoPa8Kn6V66c8d/s/AqCwDQQWT6ySEmNC/KB5vZ+lncXTsPL+O5vgrwhxk37T1ZiDrfIPBV7UnaS+c9SnDFCxJO1SBa9RGOVG0qbtRr1lJjkzj0VYrc=',
                'ASP.NET_SessionId': 'vtd0i44qrldvhboycsrpsknw',
                'BNES_ASP.NET_SessionId': 'Bd3ZJl90CjcMALLYPsKyHG33xvcqV+G6SoGH7lHfZY5tWerkI1uUOh+CGGpTuimK+JE8SPUKieudHDrIlSDMYh+DqI0BvKcqSucc3VwFrKA=',
                '.ASPXAUTH': '0A62DF576FF9D1A1702C6299970ADFDDA9659E6D68FA079766ABA7ACC510B6AB96EF43C2D78AC8743B36BAB88CE91298AE91D8BAEFF6BF1E7954FB408FCE5695D0B3F143FF2F51F2CDFEBE2AC4E39A470B1D402A3BDA664D5C43BF746EBBEA678688BC776A94285563EE1135B595227D8BE1129166763DBC3AD2E379DC737281D0768FB0A1DAE00B51FD4684F497D116',
                'BNES_.ASPXAUTH': 'kofkIkt5S+KSz3ujga2MkxPCWlGQ2AH/cnf7Zd5NZK2sGmyBftSdjAsbs7dTbtdbbZ45bbeDnj1XHyVIo196DfSKiL4aBZxmxunB2JYs5W1Yn1KEJhh1L/v2LVpBfeo9Xpfs+bpfbxUA9glCAbLI9JxAsMVllF5Y1REWVf97T6+TUXp6hW8Shrd6waBNnRJ67U2ejsHtzvtBbpvQO8YvYt9ih2EhHkVQLlQMA5lm3AIUbvXi6Rq4q8PrTArip2LyWbfcXusB7WnhQ7lQjgwLCO3WKnZTGeL02OwUEOWNMwwub52zxGRE93SOh6S1ddDzEGcWdreWA3Ve29mpLaiZbie2TBs0g1hel1pIpk2rpShrpf6BD0PNbJ9L4J6njR9vJ5nTu0v45AQgfFd1uqPMElJ384UOuc1kynbi05Cyon9ojqE2S1wdnC1savIX1n9I',
            }
            headers = {
                'Connection': 'keep-alive',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
                'Accept': '*/*',
                'X-Requested-With': 'XMLHttpRequest',
                'sec-ch-ua-mobile': '?0',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
                'sec-ch-ua-platform': '"Linux"',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Referer': 'https://www.4c.tn/Home/AccueilEtudiant',
                'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8,fr;q=0.7',
            }
            params = (
                ('id', i[0]),
            )
            result = s.get('https://www.4c.tn/Actualites/_DetailsFormations', headers=headers, params=params,
                           cookies=cookies)
            src = result.text
            soup = BeautifulSoup(src, "lxml")
            infos = soup.find_all('b')
            capacity = 0
            email = ''
            tel = ''
            newE = []
            # in the scrapping there is no difference in the data there is no classification only the tag where is the information related to phone number and email so this is to extract them with index
            for index, info in enumerate(infos):
                inf = info.text
                inf = inf.split(',')
                if (index == 2):
                    capacity = inf[0]
                if (index == 10):
                    email = inf[0]
                if (index == 12):
                    tel = inf[0].strip()
                    break
            newE.extend(i)
            newE.append(capacity)
            newE.append(email)
            newE.append(tel)
            formationFianle2.append(newE)


def scrapeCertification():
    cookies = {
        '__RequestVerificationToken': '3oQtuqteUrkta4ndw6Mi_SZLEyqbWB7bVp1NEhCSCwZK6sFloni_EHsgsrQP2G0y3PE8FaT0RjJwv0ESvt2XEnn5H8rRW6SPPiQCU-2W9rM1',
        'BNES___RequestVerificationToken': 'tODxNciOx8RMuvArbv4ZLmBfrfeh8HlkqmPfL61r/Ogq8DwcIm5ZO2Y8DbIwDqTfDSeBPA9ONDIY9tvpj8+kwLQq2d3c5v7NEqwv6G+Zj3Se5EyUChUUPY9QLG4nXmWtX4/CdKqxLwX7IXQVAmB8Hb/r6j6LoTx81P6lHFlmpt+rJaEpo9WBYhZG7Ap0C5PjwXNZwHKqjzox4u15DM8UsmCfqklnO/1CFuGcAblRF/Q=',
    }
    headers = {
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'Upgrade-Insecure-Requests': '1',
        'Origin': 'https://www.4c.tn',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-User': '?1',
        'Sec-Fetch-Dest': 'document',
        'Referer': 'https://www.4c.tn/Account/Login',
        'Accept-Language': 'en-US,en;q=0.9',
    }
    data = {
        '__RequestVerificationToken': 'EwGM95UpdCVj0tlc9CesUXwOsQ9meRF2V7nv_D-P1s6NzHonNq4_0eLLnNlQqowXYlhhc6q1SbOg35Pj8vx4Pq67Cd687VVLnfACAWNyeBM1',
        'Email': 'mahdihadjsassi@fsb.u-carthage.tn',
        'Password': 'Mahdihadjsassi1',
        'RememberMe': 'false'
    }
    with requests.session() as s:
        response = s.post('https://www.4c.tn/Account/Login', headers=headers, cookies=cookies, data=data)
        for j, i in enumerate(certicationFinale):
            cookies = {
                '__RequestVerificationToken': 'xGTyccYT6rud1plMdKzox4DJgY1fAPEXdyWgJeg95dGz-vQ-aqXF5lum0xZp0HXMykuHyOykPg0x4kPIz9lsVR9cUuK1OseDHBDLcfrWK3E1',
                'BNES___RequestVerificationToken': 'tJrXV0ZYnkea/kThcLnFXPxUgRgIhXrRucLgRpD34KwXjYbkbGSNLSRFQdlWX/VIoQh5LrSbOFuTSGUWrUBUComZR4I7ADYZnNn5o+vOVHrKJ9shF5XxwDobzoPa8Kn6V66c8d/s/AqCwDQQWT6ySEmNC/KB5vZ+lncXTsPL+O5vgrwhxk37T1ZiDrfIPBV7UnaS+c9SnDFCxJO1SBa9RGOVG0qbtRr1lJjkzj0VYrc=',
                'ASP.NET_SessionId': 'vtd0i44qrldvhboycsrpsknw',
                'BNES_ASP.NET_SessionId': 'Bd3ZJl90CjcMALLYPsKyHG33xvcqV+G6SoGH7lHfZY5tWerkI1uUOh+CGGpTuimK+JE8SPUKieudHDrIlSDMYh+DqI0BvKcqSucc3VwFrKA=',
                '.ASPXAUTH': '0A62DF576FF9D1A1702C6299970ADFDDA9659E6D68FA079766ABA7ACC510B6AB96EF43C2D78AC8743B36BAB88CE91298AE91D8BAEFF6BF1E7954FB408FCE5695D0B3F143FF2F51F2CDFEBE2AC4E39A470B1D402A3BDA664D5C43BF746EBBEA678688BC776A94285563EE1135B595227D8BE1129166763DBC3AD2E379DC737281D0768FB0A1DAE00B51FD4684F497D116',
                'BNES_.ASPXAUTH': 'kofkIkt5S+KSz3ujga2MkxPCWlGQ2AH/cnf7Zd5NZK2sGmyBftSdjAsbs7dTbtdbbZ45bbeDnj1XHyVIo196DfSKiL4aBZxmxunB2JYs5W1Yn1KEJhh1L/v2LVpBfeo9Xpfs+bpfbxUA9glCAbLI9JxAsMVllF5Y1REWVf97T6+TUXp6hW8Shrd6waBNnRJ67U2ejsHtzvtBbpvQO8YvYt9ih2EhHkVQLlQMA5lm3AIUbvXi6Rq4q8PrTArip2LyWbfcXusB7WnhQ7lQjgwLCO3WKnZTGeL02OwUEOWNMwwub52zxGRE93SOh6S1ddDzEGcWdreWA3Ve29mpLaiZbie2TBs0g1hel1pIpk2rpShrpf6BD0PNbJ9L4J6njR9vJ5nTu0v45AQgfFd1uqPMElJ384UOuc1kynbi05Cyon9ojqE2S1wdnC1savIX1n9I',
            }
            headers = {
                'Connection': 'keep-alive',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
                'Accept': '*/*',
                'X-Requested-With': 'XMLHttpRequest',
                'sec-ch-ua-mobile': '?0',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
                'sec-ch-ua-platform': '"Linux"',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Referer': 'https://www.4c.tn/Home/AccueilEtudiant',
                'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8,fr;q=0.7',
            }
            params = (
                ('id', i[0]),
            )
            result = requests.get('https://www.4c.tn/Actualites/_DetailsCertificats', headers=headers, params=params,
                                  cookies=cookies)
            src = result.text
            soup = BeautifulSoup(src, "lxml")
            infos = soup.find_all('b')
            capacity = 0
            newE = []
            for index, info in enumerate(infos):
                inf = info.text
                inf = inf.split(',')
                if (index == 2):
                    capacity = inf[0]
            newE.extend(i)
            newE.append(capacity)
            certicationFinale2.append(newE)


def scrapeJourney():
    cookies = {
        '__RequestVerificationToken': '3oQtuqteUrkta4ndw6Mi_SZLEyqbWB7bVp1NEhCSCwZK6sFloni_EHsgsrQP2G0y3PE8FaT0RjJwv0ESvt2XEnn5H8rRW6SPPiQCU-2W9rM1',
        'BNES___RequestVerificationToken': 'tODxNciOx8RMuvArbv4ZLmBfrfeh8HlkqmPfL61r/Ogq8DwcIm5ZO2Y8DbIwDqTfDSeBPA9ONDIY9tvpj8+kwLQq2d3c5v7NEqwv6G+Zj3Se5EyUChUUPY9QLG4nXmWtX4/CdKqxLwX7IXQVAmB8Hb/r6j6LoTx81P6lHFlmpt+rJaEpo9WBYhZG7Ap0C5PjwXNZwHKqjzox4u15DM8UsmCfqklnO/1CFuGcAblRF/Q=',
    }
    headers = {
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'Upgrade-Insecure-Requests': '1',
        'Origin': 'https://www.4c.tn',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-User': '?1',
        'Sec-Fetch-Dest': 'document',
        'Referer': 'https://www.4c.tn/Account/Login',
        'Accept-Language': 'en-US,en;q=0.9',
    }
    data = {
        '__RequestVerificationToken': 'EwGM95UpdCVj0tlc9CesUXwOsQ9meRF2V7nv_D-P1s6NzHonNq4_0eLLnNlQqowXYlhhc6q1SbOg35Pj8vx4Pq67Cd687VVLnfACAWNyeBM1',
        'Email': 'mahdihadjsassi@fsb.u-carthage.tn',
        'Password': 'Mahdihadjsassi1',
        'RememberMe': 'false'
    }
    with requests.session() as s:
        response = s.post('https://www.4c.tn/Account/Login', headers=headers, cookies=cookies, data=data)
        for j, i in enumerate(journeyFinale):
            cookies = {
                '__RequestVerificationToken': 'xGTyccYT6rud1plMdKzox4DJgY1fAPEXdyWgJeg95dGz-vQ-aqXF5lum0xZp0HXMykuHyOykPg0x4kPIz9lsVR9cUuK1OseDHBDLcfrWK3E1',
                'BNES___RequestVerificationToken': 'tJrXV0ZYnkea/kThcLnFXPxUgRgIhXrRucLgRpD34KwXjYbkbGSNLSRFQdlWX/VIoQh5LrSbOFuTSGUWrUBUComZR4I7ADYZnNn5o+vOVHrKJ9shF5XxwDobzoPa8Kn6V66c8d/s/AqCwDQQWT6ySEmNC/KB5vZ+lncXTsPL+O5vgrwhxk37T1ZiDrfIPBV7UnaS+c9SnDFCxJO1SBa9RGOVG0qbtRr1lJjkzj0VYrc=',
                'ASP.NET_SessionId': 'vtd0i44qrldvhboycsrpsknw',
                'BNES_ASP.NET_SessionId': 'Bd3ZJl90CjcMALLYPsKyHG33xvcqV+G6SoGH7lHfZY5tWerkI1uUOh+CGGpTuimK+JE8SPUKieudHDrIlSDMYh+DqI0BvKcqSucc3VwFrKA=',
                '.ASPXAUTH': '0A62DF576FF9D1A1702C6299970ADFDDA9659E6D68FA079766ABA7ACC510B6AB96EF43C2D78AC8743B36BAB88CE91298AE91D8BAEFF6BF1E7954FB408FCE5695D0B3F143FF2F51F2CDFEBE2AC4E39A470B1D402A3BDA664D5C43BF746EBBEA678688BC776A94285563EE1135B595227D8BE1129166763DBC3AD2E379DC737281D0768FB0A1DAE00B51FD4684F497D116',
                'BNES_.ASPXAUTH': 'kofkIkt5S+KSz3ujga2MkxPCWlGQ2AH/cnf7Zd5NZK2sGmyBftSdjAsbs7dTbtdbbZ45bbeDnj1XHyVIo196DfSKiL4aBZxmxunB2JYs5W1Yn1KEJhh1L/v2LVpBfeo9Xpfs+bpfbxUA9glCAbLI9JxAsMVllF5Y1REWVf97T6+TUXp6hW8Shrd6waBNnRJ67U2ejsHtzvtBbpvQO8YvYt9ih2EhHkVQLlQMA5lm3AIUbvXi6Rq4q8PrTArip2LyWbfcXusB7WnhQ7lQjgwLCO3WKnZTGeL02OwUEOWNMwwub52zxGRE93SOh6S1ddDzEGcWdreWA3Ve29mpLaiZbie2TBs0g1hel1pIpk2rpShrpf6BD0PNbJ9L4J6njR9vJ5nTu0v45AQgfFd1uqPMElJ384UOuc1kynbi05Cyon9ojqE2S1wdnC1savIX1n9I',
            }
            headers = {
                'Connection': 'keep-alive',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
                'Accept': '*/*',
                'X-Requested-With': 'XMLHttpRequest',
                'sec-ch-ua-mobile': '?0',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
                'sec-ch-ua-platform': '"Linux"',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Referer': 'https://www.4c.tn/Home/AccueilEtudiant',
                'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8,fr;q=0.7',
            }
            params = (
                ('id', i[0]),
            )

            result = requests.get('https://www.4c.tn/Actualites/_DetailsEvenements', headers=headers, params=params,
                                  cookies=cookies)

            src = result.text
            soup = BeautifulSoup(src, "lxml")
            infos = soup.find_all('b')
            capacity = 0
            email = ''
            tel = ''
            newE = []
            for index, info in enumerate(infos):
                inf = info.text
                inf = inf.split(',')
                if (index == 3):
                    capacity = inf[0]
                if (index == 9):
                    email = inf[0]
                if (index == 11):
                    tel = inf[0].strip()
            newE.extend(i)
            newE.append(capacity)
            newE.append(email)
            newE.append(tel)
            journeyFinale2.append(newE)


def updateFormation():
    sql.execute("select * from event")
    resultQuery = sql.fetchall()
    for i in formationFianle2:
        if (notFound(i, resultQuery)):
            query = f"insert into event (address,affiche,capacity,clubs,description,email,finishing_date,institus,nom,partenaires,pics_url,price,registration_date_limit,registration_link,shown,starting_date,tel,themes,training_centers,uid,type) values ('{i[6]}','{i[7]}','{i[10]}','','{i[8]}','{i[11]}','{dating(i[4])}','','{i[1]}','','','','{dating(i[5])}','{i[9]}','true','{dating(i[3])}','{i[12]}','{i[2]}','','{i[0]}',\'Formation\');"
            print(query)
            sql.execute(query)
            db.commit()


def updateCertification():
    sql.execute("select * from event")
    resultQuery = sql.fetchall()
    for i in certicationFinale2:
        if (notFound(i, resultQuery)):
            query = f"insert into event (address,affiche,capacity,clubs,description,email,finishing_date,institus,nom,partenaires,pics_url,price,registration_date_limit,registration_link,shown,starting_date,tel,themes,training_centers,uid,type) values ('{i[6]}','{i[7]}','{i[10]}','','{i[8]}','','{dating(i[4])}','','{i[1]}','','','','{dating(i[5])}','{i[9]}','true','{dating(i[3])}','','{i[2]}','','{i[0]}'\'Certification\');"
            print(query)
            sql.execute(query)
            db.commit()


def updateJourney():
    sql.execute("select * from event")
    resultQuery = sql.fetchall()
    for i in journeyFinale2:
        if (notFound(i, resultQuery)):
            query = f"insert into event (address,affiche,capacity,clubs,description,email,finishing_date,institus,nom,partenaires,pics_url,price,registration_date_limit,registration_link,shown,starting_date,tel,themes,training_centers,uid,type) values ('{i[6]}','{i[7]}','{i[10]}','','{i[8]}','{i[11]}','{dating(i[4])}','','{i[1]}','','','','{dating(i[5])}','{i[9]}','true','{dating(i[3])}','{i[12]}','{i[2]}','','{i[0]}'\'Journey\');"
            print(query)
            sql.execute(query)
            db.commit()


loadDataOfFormation()
# loadDataOfCertification()
# loadDataOfJourney()
