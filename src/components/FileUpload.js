import React from 'react';

class FileUpload extends React.Component {
    state = { selectedFile: null }

    onChangeHandler = event => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        });
    }

    onClickHandler = () => {
        let data = new FormData();
        data.append('file', this.state.selectedFile);
        console.log(data);
        fetch('/upload', {
            method: 'POST',
            body: data
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response is not OK');
            }
            alert('Изображение добавлено');
            return response.blob();
        })
        .catch(error => {
            alert('Произошла ошибка во время добавления файла');
            console.error('There has been a problem with the fetch operation: ', error);
        });
    }

    render() { 
        return ( 
            <>
            <h1>Please upload your file</h1>
                <input type="file" name="file" onChange={this.onChangeHandler}/>
                <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Загрузить</button>
            </>
         );
    }
}
 
export default FileUpload;