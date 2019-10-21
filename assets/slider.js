function FullPageSlider(cellCount = this.cells.length, waitLimit = 1000) {

    this.scene = document.querySelector('.scene')
    this.slider = this.scene.querySelector('.slider')
    this.cells = this.slider.querySelectorAll('.slider-item')
    this.prevButton = document.querySelector('.slider-prev-btn')
    this.nextButton = document.querySelector('.slider-next-btn')
    this.cellCount = cellCount
    this.waitLimit = waitLimit
    this.selectedIndex = 0
    this.cellWidth = this.slider.offsetWidth
    this.cellHeight = 0
    this.isHorizontal = false
    this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX'
    this.radius
    this.theta

    this.init = function()
    {
        this.setHeight()
        window.addEventListener("resize", this.setHeight.bind(this))

        document.addEventListener('wheel', this.throttleWheel(this.wheelAction.bind(this), this.waitLimit))

        if (this.prevButton)
            this.prevButton.addEventListener('click', this.prev.bind(this))

        if (this.nextButton)
            this.nextButton.addEventListener('click', this.next.bind(this))
    }

    this.wheelAction = function(event)
    {
        if (event.deltaY < 0)
        {
            this.next()
        } else if (event.deltaY > 0)
        {
            this.prev()
        }

        event.stopPropagation()
    }

    this.prev = function()
    {
        this.selectedIndex--
        this.rotateSlider()
    }

    this.next = function()
    {
        this.selectedIndex++
        this.rotateSlider()
    }

    this.clamp = function(n, min, max)
    {
        return Math.min(Math.max(n, min), max)
    }

    this.throttleWheel = function(callback, limit)
    {
        let wait = false;
        
        return function ()
        {
            let delta = this.clamp(arguments[0].deltaY, -1, 1)
            let pointer = ((this.selectedIndex * -1) + delta) + 1

            if (pointer < 1  || pointer > this.cells.length)
                return

            if (!wait)
            {
                callback.apply(null, arguments);
                wait = true;

                setTimeout(function () {
                    wait = false;
                }, limit);
            }
        }.bind(this)
    }

    this.throttle = function(callback, limit)
    {
        let wait = false;
        
        return function ()
        {
            if (!wait)
            {
                callback.apply(null, arguments);
                wait = true;

                setTimeout(function () {
                    wait = false;
                }, limit);
            }
        }
    }

    this.setHeight = function()
    {
        let bodyHeight = document.body.getBoundingClientRect().height

        this.cellHeight = bodyHeight
        //this.scene.style.height = bodyHeight+'px'
        this.changeSlider()
    }


    this.rotateSlider = function()
    {
        let angle = this.theta * this.selectedIndex * -1
        this.slider.style.transform = 'translateZ(' + -this.radius + 'px) ' + this.rotateFn + '(' + angle + 'deg)'
    }

    this.changeSlider = function ()
    {
        this.theta = 360 / this.cellCount;
        var cellSize = this.isHorizontal ? this.cellWidth : this.cellHeight;
        this.radius = Math.round((cellSize / 2) / Math.tan(Math.PI / this.cellCount));
        for (var i = 0; i < this.cells.length; i++)
        {
            var cell = this.cells[i];

            // visible cell
            if (i < this.cellCount) {
                cell.style.opacity = 1;

                // Remove the "* -1" for backwards slide positions
                cell.style.transform = this.rotateFn + '(' + ((this.theta * i) * -1) + 'deg) translateZ(' + this.radius + 'px)';
            } else {
                cell.style.opacity = 0;
                cell.style.transform = 'none';
            }
        }

        this.rotateSlider()
    }

}