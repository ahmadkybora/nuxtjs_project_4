<template>
    <div class="container" id="register" style="display: none;" ref="register">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="jumbotron">
                        <h3 v-if="!editMode">Register Products</h3>
                        <h3 v-if="editMode">Update Products</h3>
                        <form enctype="multipart/form-data" id="formData"
                              @submit.prevent="editMode ? productUpdate(product) : productCreate()"
                              @keydown="form.onKeydown($event)">

                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <select v-if="editMode" v-model="product.category_id" name="category_id"
                                                id="category-id" class="form-control">
                                            <option value="" selected disabled hidden>Please Select Category</option>
                                            <option v-for="category in categories" :value="category.id">
                                                {{ category.title }}
                                            </option>
                                        </select>
                                        <select v-else v-model="form.category_id" name="category_id" id="category-id"
                                                class="form-control">
                                            <option value="" selected disabled hidden>Please Select Category</option>
                                            <option v-for="category in categories" :value="category.id">
                                                {{ category.title }}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="form-group">

                                        <!--<input type="text" v-model="$data[editMode ? product.title :form.title]" name="title"
                                               id="title"
                                               class="form-control"
                                               placeholder="Title">-->

                                        <div v-if="editMode">
                                            <input type="text" v-model="product.title" name="title"
                                                   id="title"
                                                   class="form-control"
                                                   placeholder="Title">
                                        </div>
                                        <div v-else>
                                            <input type="text" v-model="form.title" name="title" id="title"
                                                   class="form-control"
                                                   placeholder="Title">
                                        </div>

                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="form-group">
                                        <div v-if="editMode">
                                            <input v-if="editMode" type="text" v-model="product.price" name="price"
                                                   id="price"
                                                   class="form-control" placeholder="Price">
                                        </div>
                                        <div v-else>
                                            <input type="text" v-model="form.price" name="price" id="price"
                                                   class="form-control" placeholder="Price">
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div v-if="editMode">
                                    <textarea v-model="product.description" name="description"
                                              id="description"
                                              class="form-control" placeholder="Description" rows="7"></textarea>
                                        </div>
                                        <div v-else>
                                        <textarea v-model="form.description" name="description" id="description"
                                                  class="form-control" placeholder="Description" rows="7"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!------------------------------//---------------------------->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <!---------------------//--------------------->
                                        <div class="form-check form-check-inline col-md-3">
                                            <label v-if="editMode" class="form-check-label" for="ACTIVE">
                                                <input class="form-check-input" type="radio"
                                                       v-model="product.status"
                                                       name="status" id="ACTIVE" value="ACTIVE">
                                                ACTIVE
                                            </label>
                                            <label v-else class="form-check-label" for="ACTIVE">
                                                <input class="form-check-input" type="radio" v-model="form.status"
                                                       name="status" id="ACTIVE" value="ACTIVE">
                                                ACTIVE
                                            </label>
                                        </div>
                                        <!---------------------//--------------------->
                                        <div class="form-check form-check-inline col-md-2">
                                            <label v-if="editMode" class="form-check-label" for="INACTIVE">
                                                <input class="form-check-input" type="radio"
                                                       v-model="product.status"
                                                       name="status" id="INACTIVE" value="INACTIVE">
                                                INACTIVE
                                            </label>
                                            <label v-else class="form-check-label" for="INACTIVE">
                                                <input class="form-check-input" type="radio" v-model="form.status"
                                                       name="status" id="INACTIVE" value="INACTIVE">
                                                INACTIVE
                                            </label>
                                        </div>
                                        <!---------------------//--------------------->
                                        <div class="form-check form-check-inline col-md-3">
                                            <label v-if="editMode" class="form-check-label"
                                                   for="SUSPENDED">
                                                <input class="form-check-input" type="radio"
                                                       v-model="product.status"
                                                       name="status" id="SUSPENDED" value="SUSPENDED">
                                                SUSPENDED
                                            </label>
                                            <label v-else class="form-check-label" for="SUSPENDED">
                                                <input class="form-check-input" type="radio" v-model="form.status"
                                                       name="status" id="SUSPENDED" value="SUSPENDED">
                                                SUSPENDED
                                            </label>
                                        </div>
                                        <!---------------------//--------------------->
                                        <div class="form-check form-check-inline col-md-3">
                                            <label v-if="editMode" class="form-check-label" for="PENDING">
                                                <input class="form-check-input"
                                                       type="radio"
                                                       v-model="product.status"
                                                       name="status" id="PENDING" value="PENDING">PENDING
                                            </label>
                                            <label v-else class="form-check-label" for="PENDING">
                                                <input class="form-check-input"
                                                       type="radio"
                                                       v-model="form.status"
                                                       name="status" id="PENDING" value="PENDING">PENDING
                                            </label>
                                        </div>
                                        <!---------------------//--------------------->
                                    </div>
                                </div>
                                <!---------------------//--------------------->
                            </div>
                            <!------------------------------//---------------------------->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <!--
                                                                                <input type="file" name="files" id="files" ref="files" multiple @change="handleFileUploads()" class="form-control"/>
                                        -->
                                        <input type="file" @change="onFileSelected" class="form-control"/>
                                        <dropzone id="foo" ref="el" :options="options" :destroyDropzone="true"></dropzone>
                                    </div>
                                </div>
                            </div>
                            <!--<div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Username</label>
                                        <input v-model="form.username" type="text" name="username"
                                               class="form-control" :class="{ 'is-invalid': form.errors.has('username') }">
                                        <has-error :form="form" field="username"></has-error>
                                    </div>
                                </div>
                            </div>-->
                            <!--<div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input type="file" name="file" :value="files" @input="input" ref="upload">
                                    </div>
                                </div>
                            </div>-->
                            <!------------------------------//---------------------------->
                            <!--<div class="col-md-12">
                                <div class="form-group">
                                    <h1>DropzoneJS File Upload Demo</h1>
                                    <section>
                                        <div id="dropzone">
                                            <form class="dropzone needsclick" id="demo-upload" action="/upload">
                                                <div class="dz-message needsclick">
                                                    Drop files here or click to upload.<br>
                                                    <span class="note needsclick">(This is just a demo dropzone. Selected
                                                    files are <STRONG>not</STRONG> actually uploaded.)</span>
                                                </div>
                                            </form>
                                        </div>
                                    </section>
                                    <vue2Dropzone ref="dropzone" id="drop1" v-model="icon" @vdropzone-complete="afterComplete" :options="dropOptions" multiple></vue2Dropzone>
                                    <button v-if="imgShow" class="btn btn-danger" @click.prevent="removeAllFiles">Remove All Files</button>
                                </div>
                            </div>-->
                            <!------------------------------//---------------------------->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <button v-if="!editMode" class="btn btn-success" type="submit">Register</button>
                                        <button v-if="editMode" class="btn btn-primary" type="submit">Update</button>
                                    </div>
                                </div>
                            </div>
                            <!------------------------------//---------------------------->
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import vue2Dropzone from 'vue2-dropzone'
    import 'vue2-dropzone/dist/vue2Dropzone.min.css'
    //import Dropzone from 'dropzone';
    import Axios from 'axios'
    import Swal from 'sweetalert2';
    window.Swal = Swal;
    import Vue from 'vue';
    import {Form, HasError, AlertError} from 'vform'

    Vue.component(HasError.name, HasError);
    Vue.component(AlertError.name, AlertError);

    import Dropzone from 'nuxt-dropzone'
    import 'nuxt-dropzone/dropzone.css'

    import ProductValidations  from '../../validations/ProductValidation';

    export default {
        middleware: 'checkAuthEmployee',
        name: "ProductRegister",
        components: {vue2Dropzone, Dropzone},
        /*validate({ params }) {
            // Must be a number
            return /^\d+$/.test(params.id)
        },*/
        data() {
            return {
                form: new Form({
                    selectedFile: null,
                    id: '',
                    category_id: '',
                    title: '',
                    description: '',
                    price: '',
                    files: '',
                    status: '',
                }),
                selectedFile: null,
                id: '',
                category_id: '',
                title: '',
                description: '',
                price: '',
                files: '',
                status: '',
                dropOptions: {
                    url: "https://httpbin.org/post",
                    maxFilesize: 2, // MB
                    maxFiles: 2,
                    chunking: true,
                    chunkSize: 1000000, // Bytes
                    thumbnailWidth: 100, // px
                    thumbnailHeight: 100,
                    addRemoveLinks: true
                },
                imgShow: false,
                options: {
                    url: "http://httpbin.org/anything"
                }
            }
        },
        props: ['product', 'editMode'],
        methods: {
            onFileSelected(event) {
                //const instance = this.$refs.el.dropzone;
                this.selectedFile = event.target.files[0].name;
                console.log(this.selectedFile);
            },
            uploadTodos() {
                /*let formData = new FormData();
                formData.append('file', this.file);
                for(var pair of formData.entries()) {
                    console.log(pair[0]+ ', '+ pair[1]);
                }
                this.$store.dispatch('uploadTodos', formData);*/
            },
            /*input(files) {
                this.$store.commit('updateFiles', files)
            },*/
            handleFileUploads() {
                this.files = this.$refs.files.files[0];
                //this.$store.commit('isFile', this.images)
                //console.log(this.images);
                /*this.$store.commit('updateFiles', this.images);
                console.log(this.images);*/
                /*let data = new FormData();
                let file = event.target.files[0];

                data.append('name', 'my-file')
                data.append('file', file)

                let config = {
                    header : {
                        'Content-Type' : 'multipart/form-data'
                    }
                }

                axios.post('/api', data, config).then(
                    response => {

                    }
                )*/
            },
            uploadImage() {
                var dropzone = new Dropzone('#demo-upload', {
                    previewTemplate: document.querySelector('#preview-template').innerHTML,
                    parallelUploads: 2,
                    thumbnailHeight: 120,
                    thumbnailWidth: 120,
                    maxFilesize: 3,
                    filesizeBase: 1000,
                    thumbnail: function (file, dataUrl) {
                        if (file.previewElement) {
                            file.previewElement.classList.remove("dz-file-preview");
                            var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
                            for (var i = 0; i < images.length; i++) {
                                var thumbnailElement = images[i];
                                thumbnailElement.alt = file.name;
                                thumbnailElement.src = dataUrl;
                            }
                            setTimeout(function () {
                                file.previewElement.classList.add("dz-image-preview");
                            }, 1);
                        }
                    }

                });


// Now fake the file upload, since GitHub does not handle file uploads
// and returns a 404

                var minSteps = 6,
                    maxSteps = 60,
                    timeBetweenSteps = 100,
                    bytesPerStep = 100000;

                dropzone.uploadFiles = function (files) {
                    var self = this;

                    for (var i = 0; i < files.length; i++) {

                        var file = files[i];
                        totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));

                        for (var step = 0; step < totalSteps; step++) {
                            var duration = timeBetweenSteps * (step + 1);
                            setTimeout(function (file, totalSteps, step) {
                                return function () {
                                    file.upload = {
                                        progress: 100 * (step + 1) / totalSteps,
                                        total: file.size,
                                        bytesSent: (step + 1) * file.size / totalSteps
                                    };

                                    self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);
                                    if (file.upload.progress == 100) {
                                        file.status = Dropzone.SUCCESS;
                                        self.emit("success", file, 'success', null);
                                        self.emit("complete", file);
                                        self.processQueue();
                                        //document.getElementsByClassName("dz-success-mark").style.opacity = "1";
                                    }
                                };
                            }(file, totalSteps, step), duration);
                        }
                    }
                }
            },
            uploadWidget() {
                Dropzone.options.uploadWidget = {
                    paramName: 'file',
                    maxFilesize: 2, // MB
                    maxFiles: 1,
                    dictDefaultMessage: 'Drag an image here to upload, or click to select one',
                    headers: {
                        'x-csrf-token': document.querySelectorAll('meta[name=csrf-token]')[0].getAttributeNode('content').value,
                    },
                    acceptedFiles: 'image/*',
                    init: function () {
                        this.on('success', function (file, resp) {
                            console.log(file);
                            console.log(resp);
                        });
                        this.on('thumbnail', function (file) {
                            if (file.accepted !== false) {
                                if (file.width < 640 || file.height < 480) {
                                    file.rejectDimensions();
                                } else {
                                    file.acceptDimensions();
                                }
                            }
                        });
                    },
                    accept: function (file, done) {
                        file.acceptDimensions = done;
                        file.rejectDimensions = function () {
                            done('The image must be at least 640 x 480px')
                        };
                    }
                };
            },
            removeAllFiles() {
                this.imgShow = false;
                return this.$refs.dropzone.removeAllFiles();
            },
            afterComplete(file) {
                this.imgShow = true;
                this.images = file;
                console.log(file);
                console.log(this.images);
                console.log(this.icon);
            },
            select(event) {
                //var a = event.target.value;
                this.category_id = event.target.value;
                console.log(this.category_id)
                //var optionText = event.target.options[event.target.options.selectedIndex].text;
            },
            async productCreate() {
                var isRegister = {
                    category_id: this.category_id,
                    title: this.title,
                    description: this.description,
                    price: this.price,
                    icon: this.selectedFile,
                    status: this.status,
                };
                ProductValidations.registerForm(isRegister);
                return this.$store.dispatch('Products/isProductCreate', isRegister)
            },
            productUpdate(product) {
                const isUpdate = {
                    id: product.id,
                    category_id: product.category_id,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    icon: product.icon,
                    status: product.status,
                };
                this.$store.dispatch('Products/isProductUpdate', isUpdate);
            },
        },
        computed: {
            ...mapState({
                categories: state => state.ProductCategories.getProductCategories,
                //files: state => state.Products.isFile
            })
        },
        mounted() {
            console.log(this.icon);
            return this.$store.dispatch('ProductCategories/getProductCategories')
        }
    }
</script>

<style scoped>
    body {
        background: rgb(243, 244, 245);
        height: 100%;
        color: rgb(100, 108, 127);
        line-height: 1.4rem;
        font-family: Roboto, "Open Sans", sans-serif;
        font-size: 20px;
        font-weight: 300;
        text-rendering: optimizeLegibility;
    }

    h1 {
        text-align: center;
    }

    .dropzone {
        background: white;
        border-radius: 5px;
        border: 2px dashed rgb(0, 135, 247);
        border-image: none;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
