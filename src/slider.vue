<template>
    <div class="v_slider">
        <button v-if="nav" class="v_slider__prev" v-html="prevNav" @click="prevSlide"></button>
        <button v-if="nav" class="v_slider__next" v-html="nextNav" @click="nextSlide"></button>
        <div class="v_slider__list" ref="list">
            <div class="v_slider__track" ref="track" :style="{width: width.track + 'px', transform: 'translate(-' + transform + 'px)', transition: 'transform ' + settings.timing + ' ' + settings.speed + 'ms'}">
                <slot></slot>
            </div>
        </div>
        <ul v-if="dots" class="v_slider__dots">
            <li v-for="n in numDot" @click="setDot(n)" :class="{'active': n == numDotActive}" :key="n">
                <span></span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'slider',
        props: {
            items: {
                type: Number,
                default: 3
            },

            margin: {
                type: Number,
                default: 0
            },

            nav: {
                type: Boolean,
                default: false
            },

            dots: {
                type: Boolean,
                default: false
            },

            loop: {
                type: Boolean,
                default: false
            },

            prevNav: {
                type: String,
                default: ''
            },

            nextNav: {
                type: String,
                default: ''
            },

            speed: {
                type: Number,
                default: 300
            },

            timing: {
                type: String,
                default: 'ease'
            },

            offset: {
                type: Number,
                default: 1
            },

            sibling: {
                type: Boolean,
                default: false
            },

            // Адаптивность
            responsive: {
                type: Object,
                default: {}
            },

        },

        data () {
            return {
                el: {
                    track: null,
                    slides: null,
                },

                width: {
                    document: 0,
                    container: 0,
                    slide: 0,
                    track: 0
                },

                itemActive: 0,

                numItemReal: 0,

                numItemAll: 0,

                breakpoints: [],

                numDot: 0,

                numDotActive: 0,

                transform: 0,

                settings: {
                    items: this.items,
                    margin: this.margin,
                    nav: this.nav,
                    dots: this.dots,
                    loop: this.loop,
                    prevNav: this.prevNav,
                    nextNav: this.nextNav,
                    speed: this.speed,
                    timing: this.timing,
                    offset: this.offset,
                    responsive: this.responsive
                },

                mouseDown: false,
                
                swipeDistance: 50,

                dragDistance: 0 
            }
        },

        mounted () {
            this.$nextTick(function () {

                this.el.list = this.$refs.list

                this.el.track = this.$refs.track
                
                this.el.slides = this.el.track.children

                this.numItemReal = this.el.slides.length

                for (let i = 0; i < this.numItemReal; ++i) {
                    this.el.slides[i].classList.add('v_slider__item')
                }

                if (this.settings.loop) {
                    let lastSlide = this.el.track.getElementsByClassName('v_slider__item')
                    for (let i = 0; i < this.numItemReal; ++i) {
                        let clone = lastSlide[i].cloneNode(true)
                        clone.classList.add('cloned')
                        this.el.track.insertBefore(clone, this.el.slides[this.numItemReal - 1 + i].nextSibling)
                    }
                    for (let i = this.numItemReal; i > 0; --i) {
                        let clone = lastSlide[this.numItemReal - 1].cloneNode(true)
                        clone.classList.add('cloned')
                        this.el.track.insertBefore(clone, this.el.slides[0])
                    }
                }

                if (this.settings.loop) {
                    this.numItemAll = this.numItemReal * 3
                } else {
                    this.numItemAll = this.numItemReal
                }

                window.addEventListener('resize', this.getWidthDocument)

                if ('ontouchstart' in window) {
                    this.el.track.addEventListener('touchstart', this.handleMouseDown)
                    this.el.track.addEventListener('touchend', this.handleMouseUp)
                    this.el.track.addEventListener('touchmove', this.handleMouseMove)
                } else {
                    this.el.track.addEventListener('mousedown', this.handleMouseDown)
                    this.el.track.addEventListener('mouseup', this.handleMouseUp)
                    this.el.track.addEventListener('mousemove', this.handleMouseMove)
                }

                this.getWidthDocument()
            })
        },

        beforeDestroy () {
            window.removeEventListener('resize', this.getWidthDocument)

            if ('ontouchstart' in window) {
                this.el.track.removeEventListener('touchstart', this.handleMouseDown)
                this.el.track.removeEventListener('touchend', this.handleMouseUp)
                this.el.track.removeEventListener('touchmove', this.handleMouseMove)
            } else {
                this.el.track.removeEventListener('mousedown', this.handleMouseDown)
                this.el.track.removeEventListener('mouseup', this.handleMouseUp)
                this.el.track.removeEventListener('mousemove', this.handleMouseMove)
            }
        },

        methods: {
            getWidthDocument () {
                this.width.document = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            },

            getWidth () {
                this.width.container = this.el.list.clientWidth
                if(this.settings.items == 1) {
                    this.width.slide = this.width.container
                    this.width.track = this.width.container * this.numItemAll
                } else {
                    this.width.slide = (this.width.container / this.settings.items) - ((this.settings.items - 1) * (this.settings.margin) / this.settings.items),
                    this.width.track = (this.width.container + this.settings.margin) * this.numItemAll
                }
            },

            reload () {
                if(this.responsive){
                    this.breakpoints = Object.keys(this.responsive)
                }

                if(this.breakpoints){
                    this.breakpoints.forEach((width) => {
                        if(width <= this.width.document){
                            for (let key in this.responsive[width]) {
                                this.settings[key] = this.responsive[width][key]
                            }
                        }
                    })
                }

                this.getWidth()

                if(this.settings.items == 1) {
                    this.settings.margin = 0
                } else{
                    this.settings.margin = this.margin
                }

                for (let i = 0; i < this.numItemAll; ++i) {
                    this.el.slides[i].style.width = this.width.slide + 'px'
                    this.el.slides[i].style.marginRight = this.settings.margin + 'px'
                }

                for (let i = 0; i < this.numItemAll - 1; ++i) {
                    this.el.slides[i].classList.remove('active')
                }

                if (this.settings.loop) {
                    this.transform = this.numItemReal * (this.width.slide + this.settings.margin)
                } else {
                    this.transform = 0
                }

                this.addActiveClass(this.itemActive)

                this.numDot = Math.ceil(this.numItemReal / this.settings.items)
            },

            addActiveClass (value) {
                if (this.settings.loop) {
                    value += this.numItemReal
                }

                let superClass = value + Math.floor(((this.settings.items / 2)))
                this.el.slides[superClass].classList.add('super')

                for (let i = 0; i < this.settings.items; ++i) {
                    this.el.slides[value].classList.add('active')
                    ++value
                }
            },

            setSlide (n, transition = true) {
                // Удаляем активный слайд
                for (let i = 0; i < this.numItemAll - 1; ++i) {
                    this.el.slides[i].classList.remove('active', 'super')
                }

                if (this.settings.loop) {
                    this.transform = (n + this.numItemReal - 1) * (this.width.slide + this.settings.margin)
                } else {
                    this.transform = n * (this.width.slide + this.settings.margin)
                }
                this.transform += (this.width.slide + this.settings.margin)

                if (!transition) {
                    this.settings.speed = 0
                } else {
                    this.settings.speed = this.speed
                }

                if (this.settings.loop) {
                    if (n < 0) {
                        this.itemActive = this.numItemReal - 1
                        setTimeout(() => {
                            this.setSlide(this.itemActive, false)
                        }, this.speed)
                    }
                    else if (n >= this.numItemReal) {
                        this.itemActive = 0
                        setTimeout(() => {
                            this.setSlide(0, false)
                        }, this.speed)
                    } else {
                        this.itemActive = n
                    }
                    this.addActiveClass(this.itemActive)
                } else {
                    if (n < 0) {
                        this.itemActive = 0
                    } else if (n >= this.numItemReal - this.settings.items) {
                        this.itemActive = this.numItemReal - this.settings.items
                    } else {
                        this.itemActive = n
                    }

                    this.transform = this.itemActive * (this.width.slide + this.settings.margin)
                    this.addActiveClass(this.itemActive)
                }
            },

            nextSlide () {
                this.setSlide(this.itemActive + this.settings.offset)
            },

            prevSlide () {
                this.setSlide(this.itemActive - this.settings.offset)
            },

            setDot(n) {
                if (this.settings.loop) {
                    this.setSlide((n - 1) * (this.settings.items))
                } else {
                    if(n == this.numDot) {
                        let remainder = this.numItemReal % this.settings.items
                        if(remainder == 0) {
                            this.setSlide((n - 1) * (this.settings.items))
                        } else {
                            this.setSlide(this.numItemReal - this.settings.items)
                        }
                    } else {
                        this.setSlide((n - 1) * (this.settings.items))
                    }
                }
            },


            handleMouseDown (e) {
                if (!e.touches) {
                    e.preventDefault()
                }
                this.mouseDown = true
                this.dragStartX = ('ontouchstart' in window) ? e.touches[0].clientX : e.clientX
                this.dragStartY = ('ontouchstart' in window) ? e.touches[0].clientY : e.clientY
            },
            handleMouseMove (e) {
                let positionX = ('ontouchstart' in window) ? e.touches[0].clientX : e.clientX
                let positionY = ('ontouchstart' in window) ? e.touches[0].clientY : e.clientY
                let dragDistanceX = Math.abs(positionX - this.dragStartX)
                let dragDistanceY = Math.abs(positionY - this.dragStartY)
                if (dragDistanceX > 3 * dragDistanceY) {
                    this.dragDistance = positionX - this.dragStartX
                    this.disableScroll()
                }
            },
            handleMouseUp () {
                this.mouseDown = false
                this.enableScroll()
            },
            disableScroll () {
                document.ontouchmove = function (e) {
                    e.preventDefault()
                }
            },
            enableScroll () {
                document.ontouchmove = function (e) {
                    return true
                }
            }
        },

        computed: {
            documentWidth: function () {
                return this.width.document
            }
        },

        watch: {
            documentWidth () {
                this.reload()
            },

            dragDistance () {
                if (!this.mouseDown) {
                    return
                }
                if (this.dragDistance > this.swipeDistance) {
                    this.prevSlide()
                    this.handleMouseUp()
                }
                if (this.dragDistance < -1 * this.swipeDistance) {
                    this.nextSlide()
                    this.handleMouseUp()
                }
            }
        },

        updated: function () {
            this.$nextTick(function () {
                if (this.settings.loop) {
                    this.numDotActive = Math.ceil(this.itemActive / this.settings.items + 0.1)
                } else {
                    let remainder = this.numItemReal % this.settings.items
                    if(remainder == 0) {
                        this.numDotActive = Math.ceil(this.itemActive / this.settings.items + 0.1)
                    } else {
                        if(this.itemActive >= this.numItemReal - this.settings.items) {
                            this.numDotActive = this.numDot
                        } else {
                            this.numDotActive = Math.ceil(this.itemActive / this.settings.items + 0.1)
                        }
                    }
                }

                if(this.sibling) {
                    this.el.activeItem = this.$el.getElementsByClassName('v_slider__track')[0]
                    for (let i = 0; i < this.el.activeItem.children.length; ++i) {
                        this.el.activeItem.children[i].removeEventListener('click', this.nextSlide)
                        this.el.activeItem.children[i].removeEventListener('click', this.prevSlide)
                    }
                    this.el.activeItem = this.el.activeItem.getElementsByClassName('super')[0]
                    this.el.activeItem.nextElementSibling.addEventListener('click', this.nextSlide)
                    this.el.activeItem.previousElementSibling.addEventListener('click', this.prevSlide)
                }  
            })
        }
    }
</script>

<style>
    .v_slider { 
        overflow-x: hidden; 
        text-align: center; 
    }

    .v_slider__list { 
        width: 100%; 
        min-height: 1px; 
        float: left; 
        display: block; 
        position: relative; 
        margin-bottom: 40px; 
    }

    .v_slider__track { 
        position: relative; 
        -ms-touch-action: pan-Y; 
        -moz-backface-visibility: hidden; 
    }

    .v_slider__track:after { 
        content:""; 
        display: block; 
        clear: both; 
    }

    .v_slider__item { 
        min-height: 1px; 
        float: left; 
        -webkit-backface-visibility: hidden; 
        -webkit-touch-callout: none; 
    }

    .v_slider__item.clone { 
        z-index: 2; 
    }
    
    .v_slider__prev,
    .v_slider__next { 
        outline: none; 
        color:#fff; 
        font-size: 20px; 
        border: none; 
        border-radius: 50%;
        width: 48px;
        height: 48px;
        margin: 0 9.5px 20px;
        z-index: 1;
    }
    .v_slider__prev {
        background:transparent url(img/left.svg) no-repeat center /100% ; 
    }

    .v_slider__next {
        background:transparent url(img/right.svg) no-repeat center /100% ; 
    }
    .v_slider__prev:hover,
    .v_slider__next:hover { 
        cursor: pointer; 
        opacity: 0.5; 
    }

</style>