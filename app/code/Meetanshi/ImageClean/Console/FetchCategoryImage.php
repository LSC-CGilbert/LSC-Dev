<?php

namespace Meetanshi\ImageClean\Console;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Meetanshi\ImageClean\Helper\Data;

/**
 * Class FetchCategoryImage
 * @package Meetanshi\ImageClean\Console
 */
class FetchCategoryImage extends Command
{
    /**
     * @var Data
     */
    protected $helper;

    /**
     * FetchCategoryImage constructor.
     * @param Data $data
     */
    public function __construct(Data $data)
    {
        $this->helper = $data;
        parent::__construct($name = null);
    }

    /**
     *
     */
    protected function configure()
    {
        $this->setName('imageclean:category-image:fetch');
        $this->setDescription('ImageClean Fetch Category Image');
        parent::configure();
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->helper->compareCategoryList();
        $output->writeln("Unused Category Image(s) Successfully Fetched");
    }
}
